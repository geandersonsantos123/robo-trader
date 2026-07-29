# Análise das referências visuais

## Como interpretar

As seis imagens têm 941×1672 e simulam seções mobile dentro de uma moldura de aparelho. Elas orientam composição, atmosfera e hierarquia; não são screenshots de uma página contínua. Cabeçalho, menu, roller e indicação “role” repetidos em todas as peças devem virar elementos reais compartilhados, não duplicados em cada seção.

Textos, preços, parcelamento, duração de vídeo, recursos, resultados, compatibilidades, provas e condições vistos nas imagens não são autoritativos. O único preço oficial é **R$197**.

## 01 — Hero e VSL

- **Arquivo / seção:** [`01-hero-vsl.png`](../../references/visual/mobile-sections/01-hero-vsl.png); abertura com VSL.
- **Objetivo psicológico:** combinar alcance global e controle de rotina, levando curiosidade aspiracional para uma explicação do produto.
- **Papel na conversão:** estabelecer marca, promessa de processo, mecanismo audiovisual, três pilares e primeira ação.
- **Primeira percepção:** headline branca/verde; em seguida logo e mapa global. A VSL é percebida antes dos cards e CTA.
- **Hierarquia:** eyebrow → headline muito grande → parágrafo → thumbnail/play → três cards → CTA neon → risco → roller.
- **Layout:** coluna única com conteúdo alinhado à esquerda; mídia quase full-width; grandes respiros e moldura arredondada externa.
- **Cards:** três cards compactos lado a lado com ícone e rótulo. Em 390 px reais precisam virar faixa com snap ou grade adaptativa.
- **Glassmorphism:** baixo a moderado; cards e mídia usam fundo preto translúcido, borda fina e brilho interno.
- **Glow:** alto no CTA/play e moderado no verde da marca. Na implementação, reduzir halo para preservar contraste e aparência premium.
- **Ícones:** lineares, monocoloridos, traço consistente; computador, formação e configuração.
- **Fundo/texturas:** preto com mapa pontilhado, arcos globais e candles discretos; textura deve ser SVG/CSS leve, sem competir com texto.
- **Roller de transição:** faixa inferior com termos curtos separados por pontos; útil como passagem para a aspiração.
- **CTA:** full-width, verde preenchido, caixa alta e seta diagonal; maior destaque depois da VSL.
- **Animações possíveis:** reveal da mensagem, mapa quase estático, cards em stagger e roller contínuo; play reage somente à interação.
- **Mobile real:** reduzir headline, manter 20 px de margem, não usar moldura de telefone, impedir que três cards fiquem estreitos e não carregar vídeo antes do play.
- **Padrões reutilizáveis:** eyebrow, section heading, media shell, mini-card, CTA primário, risk notice e roller.
- **Legibilidade:** densidade alta para um hero; o conjunto pode ultrapassar muito a primeira dobra. CTA, mídia e prova devem ser priorizados sem tentar encaixar tudo no viewport.
- **Não copiar:** “1:00”, recursos específicos sem confirmação, texto literal, imagem do robô humanoide ou qualquer insinuação de oportunidade financeira.
- **Conceito vs. implementação:** usar um único header real, VSL acessível com poster e transcrição, ícones SVG e mapa vetorial otimizado; não rasterizar a seção.

## 02 — Liberdade e mercados globais

- **Arquivo / seção:** [`02-liberdade-mercados-globais.png`](../../references/visual/mobile-sections/02-liberdade-mercados-globais.png); continuidade aspiracional.
- **Objetivo psicológico:** mostrar que localização não precisa limitar estudo e acompanhamento, sem transformar isso em promessa de renda.
- **Papel na conversão:** conectar o anúncio/Instagram à narrativa responsável antes da dor.
- **Primeira percepção:** headline sobre endereço e possibilidades, apoiada pelo mapa; a foto de viagem surge depois dos cards.
- **Hierarquia:** eyebrow → headline → parágrafo → trio de benefícios → fotografia → CTA → risco → roller.
- **Layout:** bloco editorial superior, três cards iguais e imagem panorâmica encaixada abaixo.
- **Cards:** três, verticais, com ícone grande, título e descrição. Em 390 px não devem permanecer em três colunas fixas.
- **Glassmorphism:** moderado nos cards, com transparência sobre mapa/fotografia e borda teal.
- **Glow:** acento nos ícones, filete inferior e CTA; fotografia mantém contraste frio.
- **Ícones:** globo, moedas e localização. O ícone de moedas só pode acompanhar texto comercial confirmado, sem sugerir ganhos.
- **Fundo/texturas:** mapa e candles como textura; fotografia de trabalho em destino turístico é forte, mas pode parecer promessa se não for contextualizada.
- **Roller de transição:** reforça liberdade, mercados e flexibilidade; deve evitar termos financeiros ambíguos.
- **CTA:** “conhecer” reduz pressão e conduz ao método, com alto destaque visual.
- **Animações possíveis:** cards entram em sequência; imagem usa fade; evitar parallax por custo e enjoo.
- **Mobile real:** usar scroll-snap ou pilha de cards, recorte de imagem responsivo e texto mais curto; manter alvo de toque de 44 px.
- **Padrões reutilizáveis:** card de benefício, imagem com fade de borda, roller e risk notice.
- **Legibilidade:** trio lado a lado é denso e descrições longas; o parágrafo repete parte da headline.
- **Não copiar:** frases que impliquem acompanhamento “de onde estiver” sem requisitos, lista de moedas/mercados não confirmada e fotografia sem licença.
- **Conceito vs. implementação:** traduzir aspiração em benefício de rotina condicional; usar asset licenciado/real e não decorar com símbolos de moeda gratuitos.

## 03 — Dor da execução manual

- **Arquivo / seção:** [`03-dor-execucao-manual.png`](../../references/visual/mobile-sections/03-dor-execucao-manual.png); problema.
- **Objetivo psicológico:** gerar reconhecimento de impulso, inconsistência e dependência de tela.
- **Papel na conversão:** criar necessidade por método sem medo, culpa ou promessa de evitar perdas.
- **Primeira percepção:** headline grande com virada em verde; o eyebrow vermelho sinaliza “desafio”.
- **Hierarquia:** eyebrow vermelho → headline → explicação → quatro cards de dor → frase-pivô → CTA → roller.
- **Layout:** coluna principal e grade 2×2; cores semânticas separam dor (vermelho) de solução (verde).
- **Cards:** quatro cards com ícone grande, título e uma frase. No mobile real, 2×2 só funciona com copy muito curta; preferir uma coluna em telas estreitas.
- **Glassmorphism:** leve, com cards mais opacos para preservar legibilidade.
- **Glow:** vermelho contido nos ícones e verde forte no CTA; boa separação sem pintar todo o bloco de vermelho.
- **Ícones:** cabeça/coração, monitor, calendário e raio; linguagem linear uniforme.
- **Fundo/texturas:** mapa e candles muito discretos; ruído menor que nas seções aspiracionais.
- **Roller de transição:** oposição “menos impulso / mais método / mais controle / mais consistência”.
- **CTA:** ação de baixo compromisso que entrega a ponte prometida.
- **Animações possíveis:** stagger dos quatro problemas e reveal da frase-pivô; nada que pisque como alerta.
- **Mobile real:** evitar título de cinco/seis linhas, manter vermelho acessível e não comprimir duas colunas.
- **Padrões reutilizáveis:** semantic card, icon badge, bridge statement e CTA.
- **Legibilidade:** texto ocupa grande parte do canvas; 2×2 cria corpos estreitos e pode exigir fonte pequena.
- **Não copiar:** generalizações psicológicas como fato, alegação de consistência garantida e texto literal sem validação com público.
- **Conceito vs. implementação:** dor deve ser redigida como possibilidade (“pode”), com HTML semântico e grid fluido, não como infográfico rasterizado.

## 04 — Método Aprenda, Teste e Automatize

- **Arquivo / seção:** [`04-metodo-aprenda-teste-automatize.png`](../../references/visual/mobile-sections/04-metodo-aprenda-teste-automatize.png); mecanismo.
- **Objetivo psicológico:** reduzir complexidade por sequência e mostrar que o usuário permanece no controle.
- **Papel na conversão:** responder “como funciona?” antes da demonstração e da oferta.
- **Primeira percepção:** headline com contraste entre ação do usuário e execução do sistema; depois a timeline numerada.
- **Hierarquia:** eyebrow → headline → cinco etapas → CTA → roller.
- **Layout:** timeline vertical com números à esquerda, ícone e texto à direita; repetição controlada facilita varredura.
- **Cards:** cinco linhas/cards, cada uma com ícone, verbo e descrição curta; a timeline é o componente dominante.
- **Glassmorphism:** leve nos passos, fundo quase sólido e borda sutil.
- **Glow:** círculos numerados e linha vertical; pode ser reduzido para evitar cinco focos competindo.
- **Ícones:** livro, laboratório, controles, play e monitor; metáforas claras e lineares.
- **Fundo/texturas:** mapa/candles apenas no topo; o centro limpo favorece a sequência.
- **Roller de transição:** repete os cinco verbos e fixa o método.
- **CTA:** promete demonstração prática, ideal para avançar à prova do mecanismo.
- **Animações possíveis:** ativação progressiva de cada passo conforme rolagem; sem dependência de animação para compreender ordem.
- **Mobile real:** timeline vertical é adequada; linha e números devem ser decorativos para leitor de tela, preservando lista ordenada semântica.
- **Padrões reutilizáveis:** process step, ordered timeline, icon tile e verb label.
- **Legibilidade:** cinco passos tornam a seção longa, porém coerente; descrições devem permanecer em uma ou duas linhas.
- **Não copiar:** “use capital real”, recursos/ações da ferramenta e resultado operacional sem confirmação.
- **Conceito vs. implementação:** construir como `<ol>`, permitir responsividade horizontal no desktop e sempre manter “acompanhe” após “automatize”.

## 05 — Estrutura completa

- **Arquivo / seção:** [`05-estrutura-completa.png`](../../references/visual/mobile-sections/05-estrutura-completa.png); composição da entrega.
- **Objetivo psicológico:** ampliar valor percebido e reduzir a sensação de comprar software isolado.
- **Papel na conversão:** organizar o que será recebido antes de prova, qualificação e preço.
- **Primeira percepção:** headline “não recebe só o robô”, seguida por quatro categorias numeradas.
- **Hierarquia:** eyebrow → headline → quatro painéis → frase de segurança → CTA → roller.
- **Layout:** acordeões empilhados com ícone à esquerda, lista no centro e chevron à direita.
- **Cards:** quatro painéis de tecnologia, formação, implementação e continuidade; padrão ideal para acordeão acessível.
- **Glassmorphism:** moderado com borda clara e fundo escuro; painéis têm densidade elevada.
- **Glow:** ícones e bordas com halo discreto; CTA concentra o maior brilho.
- **Ícones:** chip, capelo, foguete e headset; fáceis de sistematizar em SVG.
- **Fundo/texturas:** cubos digitais no topo, mais adequados à tecnologia do que gráfico financeiro literal.
- **Roller de transição:** lista resumida de entregáveis; só usar termos confirmados.
- **CTA:** leva a planos/condições na referência; na página real deve primeiro passar por compatibilidade/prova conforme o fluxo recomendado.
- **Animações possíveis:** expansão de acordeão, stagger de categorias e chevron rotativo; duração curta.
- **Mobile real:** resumo visível e detalhes sob demanda reduzem altura; áreas de toque precisam de 44 px e foco visível.
- **Padrões reutilizáveis:** accordion card, category icon, checklist e trust line.
- **Legibilidade:** quatro listas abertas de uma vez criam parede de texto; o estado inicial deve condensar detalhes.
- **Não copiar:** painel de configuração, recursos, atualizações, mercados, instalação, checklists, biblioteca ou comunidade sem confirmação.
- **Conceito vs. implementação:** manter quatro pilares, mas preencher apenas o escopo aprovado e implementar controles nativos/acessíveis.

## 06 — Oferta

- **Arquivo / seção:** [`06-oferta-r197.png`](../../references/visual/mobile-sections/06-oferta-r197.png); decisão de compra.
- **Objetivo psicológico:** consolidar valor, preço, segurança e ação em um único foco.
- **Papel na conversão:** converter compreensão em início de checkout ou contato.
- **Primeira percepção:** headline e card de estrutura; o bloco de preço gigante domina logo depois.
- **Hierarquia:** eyebrow → headline → resumo da entrega → preço → três microbenefícios → CTA principal → contato → risco → roller.
- **Layout:** coluna central com dois cards grandes e CTAs empilhados; simetria alta reforça decisão.
- **Cards:** resumo de entrega, preço e faixa de três benefícios; boa modularidade, mas informação demais em pouco espaço.
- **Glassmorphism:** forte no card do produto/preço; bordas teal e fundos translúcidos.
- **Glow:** muito alto no preço e CTA; reduzir para que o valor continue legível e não pareça promoção agressiva.
- **Ícones:** checkmarks, marca, formação, monitor, escudo e WhatsApp; canal só pode existir com contato oficial.
- **Fundo/texturas:** mapa global sutil; adequada continuidade com hero.
- **Roller de transição:** contém “acesso imediato” e outros termos não confirmados; reescrever integralmente.
- **CTA:** principal muito destacado e secundário de WhatsApp; destinos e rótulos dependem de confirmação.
- **Animações possíveis:** entrada única do card e glow estático; jamais contagem regressiva ou preço animado.
- **Mobile real:** manter preço em uma linha legível, CTAs sem overflow e aviso de risco com contraste; evitar três microcards apertados.
- **Padrões reutilizáveis:** offer card, deliverables checklist, price lockup, CTA group e risk notice.
- **Legibilidade:** excesso de níveis, glow e pequenos textos competem; simplificar resumo e mover dúvidas para FAQ.
- **Não copiar:** qualquer preço, parcelamento, valor à vista, ancoragem, preço riscado, “acesso imediato”, formação nomeada, condição, item, WhatsApp ou outro dado comercial da imagem. O único preço autorizado é **R$197**.
- **Conceito vs. implementação:** usar “Investimento total: R$197”, itens confirmados, link real e tracking após consentimento; nenhuma parte comercial deve vir do raster.

## Síntese compartilhada

### Padrões úteis

- **Largura/alinhamento:** conteúdo central, margens generosas e alinhamento predominantemente à esquerda; no desktop usar container máximo, não ampliar linhas de texto.
- **Tipografia:** display sans pesada, contraste branco/verde e parágrafos claros. Limitar headline a três linhas no mobile e corpo a 65–70 caracteres no desktop.
- **Ritmo/espaçamento:** eyebrow → headline → conteúdo visual → CTA → roller. Variar a anatomia interna para não parecer seis cards gigantes empilhados.
- **Cards:** fundo preto translúcido, borda teal de 1 px, raio médio, ícone em tile e texto curto. Glass apenas onde agrupa informação repetível.
- **CTAs:** altura confortável, seta diagonal, verde sólido e glow controlado; foco visível não pode depender do glow.
- **Rollers:** faixa baixa, texto curto e repetível; usar como transição entre ideias, pausar com reduced motion e evitar seis rollers simultâneos no DOM.
- **Cores:** verde neon para ação/tecnologia; branco para títulos; cinza para apoio; vermelho apenas em dor/risco. Não depender somente da cor.
- **Fundos:** mapas, arcos e grids como textura de baixa opacidade; gráficos não são prova, nem devem sugerir performance real.
- **Densidade:** cada referência está muito cheia para uma dobra real. A implementação deve retirar moldura de telefone, header repetido e instrução “role” repetida.
- **Alternância:** mídia, cards, timeline, demonstração, acordeão, prova editorial, checklist e oferta central.
- **Ícones:** linha monocolorida, cantos coerentes e stroke consistente; decorativos recebem `aria-hidden`.
- **Animação:** opacity/translate curtos, stagger limitado, `IntersectionObserver`, nenhum efeito indispensável à leitura.

### Padrões a não repetir

- Cabeçalho e menu dentro de cada seção.
- Moldura de aparelho, cantos externos e seta “role para descobrir mais” após cada bloco.
- Três cards fixos em colunas estreitas no mobile.
- Glows extensos, mapa/candles em todas as áreas e texto sobre fundo ruidoso.
- Repetição de headline + cards + CTA + roller em sequência sem variação.
- Conteúdo das imagens tratado como dado comercial ou evidência do produto.
