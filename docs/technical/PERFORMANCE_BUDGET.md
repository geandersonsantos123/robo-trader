# Orçamento de performance

Metas de trabalho para mobile, sem incluir o arquivo de vídeo após interação. Medir em condições comparáveis; uma execução de laboratório não prova experiência real.

## Metas de experiência

| Métrica | Meta |
| --- | --- |
| LCP | ≤ 2,5 s no p75 mobile quando houver dados; alvo de laboratório equivalente |
| INP | ≤ 200 ms no p75 |
| CLS | ≤ 0,10 |
| TTFB | ≤ 800 ms no ambiente publicado |
| Conteúdo/CTA inicial | compreensível mesmo antes de efeitos ou tracking |

## Limites de transferência

| Recurso | Limite recomendado |
| --- | --- |
| HTML comprimido | ≤ 55 KB |
| CSS comprimido | ≤ 45 KB |
| JavaScript próprio comprimido | ≤ 35 KB |
| Fontes iniciais | ≤ 100 KB; no máximo dois arquivos/pesos necessários |
| Poster/LCP | ≤ 180 KB, com variantes responsivas |
| Imagem abaixo da dobra | alvo ≤ 120 KB cada |
| Carga inicial total | ≤ 700 KB antes de vídeo e scripts de marketing |
| Página completa sem vídeo | alvo ≤ 1,5 MB |

Pixel/consentimento e scripts de terceiros devem ser contabilizados separadamente e não podem justificar regressão silenciosa.

## Linha de base da Etapa 2

Medição dos arquivos próprios não comprimidos em 2026-07-20, sem screenshots de QA, referências conceituais, vídeo ou terceiros:

| Recurso | Bytes |
| --- | ---: |
| HTML | 38.744 |
| CSS total | 35.061 |
| JavaScript próprio total | 21.900 |
| SVGs do protótipo | 3.426 |
| Total inicial aproximado | 99.131 |

A linha de base fica muito abaixo do limite total de 700 KB mesmo antes de compressão. Não há fonte externa, imagem raster de produção, vídeo ou script de marketing no carregamento atual. LCP/INP/CLS reais, cache e throttling continuam pendentes para staging na Etapa 3.

## Estratégia

- Converter fotografia para AVIF com fallback WebP; SVG para logo, ícones, mapa e grids.
- Nunca servir os PNGs de referência de 1,4–1,6 MB como seções prontas.
- Definir `width`/`height` ou `aspect-ratio`; usar `srcset`/`sizes` e lazy loading abaixo da dobra.
- Priorizar apenas o verdadeiro asset de LCP. Evitar `preload` generalizado.
- Auto-hospedar somente fontes aprovadas; preferir variável/subset ou system font.
- Poster leve; player/iframe e vídeo apenas após interação. Sem autoplay com download escondido.
- Um SVG de textura reutilizável, posicionado por CSS; não repetir mapas rasterizados.
- CSS para animações simples; sem biblioteca de motion, slider ou ícones.
- Minificar/compactar na publicação se o pipeline oferecer, mas não criar framework só para minificação.

## Testes obrigatórios na Etapa 2/3

1. Cache frio em 390×844 com rede/CPU móveis simuladas e depois dispositivo real quando disponível.
2. Confirmar no painel de rede que a VSL não baixa antes do play.
3. Auditar LCP e verificar que poster/fonte não competem indevidamente.
4. Verificar CLS ao carregar mídia, fontes, consentimento e sticky CTA.
5. Verificar INP de FAQ, menu, play e CTA.
6. Inspecionar Safari/iOS e navegador interno do Instagram; se blur/glow prejudicar fluidez, reduzir efeitos.
7. Registrar números, ambiente, cache e limitações no ExecPlan; não declarar aprovação por impressão visual.
