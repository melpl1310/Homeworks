import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  drag,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
} from 'd3';
import type {
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from 'd3';
import { AristaGrafo, NodoGrafo } from '../models/grafo.model';

interface NodoVisual extends SimulationNodeDatum {
  id: string;
  nombre: string;
  tipo: NodoGrafo['tipo'];
  etiqueta: string;
}

interface AristaVisual extends SimulationLinkDatum<NodoVisual> {
  source: string | NodoVisual;
  target: string | NodoVisual;
}

@Component({
  selector: 'app-grafo',
  standalone: true,
  templateUrl: './grafo.html',
  styleUrl: './grafo.css',
})
export class Grafo implements AfterViewInit, OnChanges, OnDestroy {
  @Input() nodos: NodoGrafo[] = [];
  @Input() aristas: AristaGrafo[] = [];

  @ViewChild('graphSvg') private graphSvg?: ElementRef<SVGSVGElement>;

  private simulation?: Simulation<NodoVisual, AristaVisual>;
  private viewInitialized = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderizarGrafo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInitialized && (changes['nodos'] || changes['aristas'])) {
      this.renderizarGrafo();
    }
  }

  ngOnDestroy(): void {
    this.simulation?.stop();
  }

  private renderizarGrafo(): void {
    const svgElement = this.graphSvg?.nativeElement;

    if (!svgElement) {
      return;
    }

    this.simulation?.stop();

    const width = Math.max(svgElement.clientWidth, 700);
    const height = 460;
    const svg = select(svgElement)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('*').remove();

    if (this.nodos.length === 0) {
      return;
    }

    const nodosVisuales: NodoVisual[] = this.nodos.map((nodo) => ({
      id: nodo.id,
      nombre: nodo.nombre,
      tipo: nodo.tipo,
      etiqueta:
        nodo.tipo === 'persona' && nodo.edad !== undefined
          ? `${nodo.nombre} (${nodo.edad})`
          : nodo.nombre,
    }));
    const nodosPorId = new Map(nodosVisuales.map((nodo) => [nodo.id, nodo]));
    const aristasVisuales: AristaVisual[] = this.aristas
      .filter(
        (arista) =>
          nodosPorId.has(arista.origen) && nodosPorId.has(arista.destino),
      )
      .map((arista) => ({
        source: arista.origen,
        target: arista.destino,
      }));

    const enlaces = svg.append('g').attr('class', 'enlaces');
    const lineas = enlaces
      .selectAll<SVGLineElement, AristaVisual>('line')
      .data(aristasVisuales)
      .join('line')
      .attr('class', 'enlace')
      .attr('stroke', '#d6a5ca')
      .attr('stroke-width', 2.5);

    const grupoNodos = svg.append('g').attr('class', 'nodos');
    const grupos = grupoNodos
      .selectAll<SVGGElement, NodoVisual>('g')
      .data(nodosVisuales, (nodo) => nodo.id)
      .join('g')
      .attr('class', (nodo) => `nodo nodo-${nodo.tipo}`);

    grupos
      .append('circle')
      .attr('r', (nodo) => (nodo.tipo === 'ciudad' ? 25 : 19))
      .attr('fill', (nodo) => (nodo.tipo === 'ciudad' ? '#7546a8' : '#fff0f7'))
      .attr('stroke', (nodo) => (nodo.tipo === 'ciudad' ? '#56327f' : '#dc5b9a'))
      .attr('stroke-width', 2.5);

    grupos
      .append('text')
      .attr('x', 34)
      .attr('dy', '0.35em')
      .attr('fill', (nodo) => (nodo.tipo === 'ciudad' ? '#56327f' : '#63364f'))
      .attr('font-family', 'Arial, sans-serif')
      .attr('font-size', 13)
      .attr('font-weight', (nodo) => (nodo.tipo === 'ciudad' ? 'bold' : 'normal'))
      .attr('pointer-events', 'none')
      .attr('user-select', 'none')
      .text((nodo) => nodo.etiqueta);

    const simulation = forceSimulation<NodoVisual, AristaVisual>(nodosVisuales)
      .force(
        'link',
        forceLink<NodoVisual, AristaVisual>(aristasVisuales)
          .id((nodo) => nodo.id)
          .distance(150),
      )
      .force('charge', forceManyBody<NodoVisual>().strength(-420))
      .force('center', forceCenter(width / 2, height / 2))
      .force(
        'collision',
        forceCollide<NodoVisual>().radius((nodo) =>
          nodo.tipo === 'ciudad' ? 85 : 75,
        ),
      );

    grupos.call(
      drag<SVGGElement, NodoVisual>()
        .on('start', (event, nodo) => {
          if (!event.active) {
            simulation.alphaTarget(0.3).restart();
          }
          nodo.fx = nodo.x;
          nodo.fy = nodo.y;
        })
        .on('drag', (event, nodo) => {
          nodo.fx = event.x;
          nodo.fy = event.y;
        })
        .on('end', (event, nodo) => {
          if (!event.active) {
            simulation.alphaTarget(0);
          }
          nodo.fx = null;
          nodo.fy = null;
        }),
    );

    simulation.on('tick', () => {
      lineas
        .attr('x1', (arista) => this.coordenada(arista.source, 'x'))
        .attr('y1', (arista) => this.coordenada(arista.source, 'y'))
        .attr('x2', (arista) => this.coordenada(arista.target, 'x'))
        .attr('y2', (arista) => this.coordenada(arista.target, 'y'));

      grupos.attr(
        'transform',
        (nodo) => `translate(${nodo.x ?? 0},${nodo.y ?? 0})`,
      );
    });

    this.simulation = simulation;
  }

  private coordenada(
    extremo: string | NodoVisual,
    eje: 'x' | 'y',
  ): number {
    if (typeof extremo === 'string') {
      return 0;
    }

    return extremo[eje] ?? 0;
  }
}
