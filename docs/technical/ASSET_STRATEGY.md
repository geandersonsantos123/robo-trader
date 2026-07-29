# Estratégia de assets

## Inventário atual

As seis imagens são **referência conceitual**, não assets de produção. Todas têm 941×1672; juntas somam 9.163.190 bytes (~8,74 MiB). A mudança de pasta/nome preservou os hashes.

| Origem | Arquivo atual | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `referencias-visuais/hero.png` | `01-hero-vsl.png` | 1.424.323 | `094DC294FE9DBEE51A19CD6479107B4BD7CDFBC0E2C935E4A118554B69A3D71A` |
| `referencias-visuais/liberdadefinanceira.png` | `02-liberdade-mercados-globais.png` | 1.540.691 | `A599AFD7F277D60F245C338D068B2940ECB308BB94512933FFBA8EB7EE46A988` |
| `referencias-visuais/problema.png` | `03-dor-execucao-manual.png` | 1.547.486 | `CB9B419FB51E064AF020CFA21E8F0D6C8FAA5B7FCD3BCF5EED49E9B2DB8D57FC` |
| `referencias-visuais/metodo.png` | `04-metodo-aprenda-teste-automatize.png` | 1.560.936 | `EE6877289DA93B49577A169DABF8C62EACAEC3D610E4D0C6BBF7ACE43A09D513` |
| `referencias-visuais/estrutura.png` | `05-estrutura-completa.png` | 1.519.796 | `70947E0155A8F2D1D69F0C08BAEA2A804A864E6CCAF79001AAB0674ADAAF94AA` |
| `referencias-visuais/oferta.png` | `06-oferta-r197.png` | 1.569.958 | `E638AD446BF8A53B04160FF41E215EA00600228D5568D8DBBB23EDF543F267C3` |

## Assets leves criados para o protótipo

| Arquivo | Uso | Estado para publicação |
| --- | --- | --- |
| `assets/images/brand/favicon.svg` | favicon provisório | substituir quando a marca oficial for entregue |
| `assets/images/brand/og-preview.svg` | composição social provisória | exportar imagem final 1200×630 e configurar URL absoluta |
| `assets/images/backgrounds/world-network.svg` | textura abstrata global | pode permanecer se aprovado visualmente |
| `assets/images/posters/vsl-placeholder.svg` | poster honesto da VSL | substituir pelo poster oficial junto com vídeo e transcrição |

Esses quatro SVGs são próprios do protótipo, não apresentam dados financeiros e somam menos de 4 KB. Nenhum dos seis PNGs de referência é carregado pela landing. Os hashes do inventário conceitual permaneceram preservados após a implementação.

## Assets obrigatórios ainda ausentes

Prioridade 0 — bloqueiam fidelidade/publicação:

- logo oficial vetorial e versões claro/monocromática; não recortar a logo dos PNGs;
- VSL final, poster, legendas/transcrição, duração e política de hospedagem;
- capturas reais autorizadas ou gravação do produto e lista de recursos visíveis;
- URL de checkout/contato e ativos legais (privacidade, termos, risco);
- perfil/foto/credenciais autorizadas de quem sustenta autoridade, se essa seção existir.

Prioridade 1 — direção visual:

- fotografia aspiracional licenciada ou material original, com versões mobile/desktop;
- mapa/grid abstrato em SVG, sem dados financeiros interpretáveis;
- família tipográfica e licença, se diferente de fonte de sistema;
- ícones lineares consistentes ou sprite próprio;
- favicon, ícone de app e imagem social 1200×630.

Prioridade 2 — prova e refinamento:

- documentação técnica pública, diagrama do fluxo e controles de risco;
- depoimentos/casos com consentimento, fonte e contexto, se existirem;
- capturas de onboarding, conta demo, materiais e suporte, se confirmados.

## Produção e nomenclatura

- Nomes descritivos em kebab-case: `robo-trader-dashboard-mobile.webp`, `vsl-poster-1280.avif`.
- Fotografias: AVIF + WebP, larguras adequadas (ex.: 480/768/1280), ponto focal documentado.
- Vetores: SVG limpo, sem texto rasterizado; ícones decorativos sem título redundante.
- Mídia: dimensões explícitas e poster; vídeo com streaming/hospedagem adequada, nunca empacotado no carregamento inicial.
- Guardar fontes e licenças; não baixar assets arbitrários sem origem.
- Registrar autor, licença, data, uso e texto alternativo em inventário quando os assets finais entrarem.

## Fallbacks seguros

- Sem VSL: manter poster/diagrama e copy literal; não embutir vídeo genérico.
- Sem screenshot real: usar diagrama rotulado “fluxo ilustrativo”, sem fingir interface.
- Sem prova social: usar evidência técnica confirmada; não criar depoimentos.
- Sem fotografia licenciada: usar mapa/grid abstrato leve e reduzir a aspiração visual.
