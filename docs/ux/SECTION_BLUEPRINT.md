# Blueprint das seções

Os títulos abaixo são direções de conteúdo, não copy comercial aprovada. Cada seção principal usa uma ideia dominante, um CTA e uma faixa rolante curta. Em 390 px, nenhum card deve depender de hover.

## 1. Hero e VSL — `#inicio`

- **Objetivo:** explicar o produto e converter curiosidade em intenção de entender o mecanismo.
- **Conteúdo:** marca; eyebrow de tecnologia; headline em até três linhas; parágrafo curto; poster da VSL; três sinais de estrutura (demo, formação, configuração); aviso de risco.
- **Layout:** uma coluna no mobile; mídia abaixo da mensagem. No desktop, copy e mídia podem formar 5/7 colunas, mantendo CTA cedo.
- **CTA:** “Entender como funciona” → `#metodo`. O play é uma ação separada e acessível.
- **Roller:** “mercados compatíveis • tecnologia • conhecimento • automação configurável”.
- **Movimento:** headline e mídia com reveal leve; play sem pulso infinito.
- **Aceite:** em 390×844, nome, definição, CTA ou play e início da mídia são percebidos sem texto comprimido; risco não fica oculto.

## 2. Visão de rotina global — `#possibilidade`

- **Objetivo:** manter continuidade emocional com o Instagram sem prometer resultado.
- **Conteúdo:** flexibilidade, mercados globais compatíveis, estudo e acompanhamento de diferentes lugares; três benefícios de contexto.
- **Layout:** texto seguido de trio horizontal rolável com snap no mobile ou grade no desktop; uma imagem aspiracional autêntica somente se houver licença.
- **CTA:** “Conhecer a proposta” → `#metodo`.
- **Roller:** “flexibilidade • mercados globais • organização • autonomia”.
- **Movimento:** cards em stagger curto; imagem sem parallax no mobile.
- **Aceite:** a copy usa verbos condicionais e não associa localização a lucro, renda ou ausência de acompanhamento.

## 3. Dor da execução manual — `#desafio`

- **Objetivo:** tornar concreto o custo de operar sem processo.
- **Conteúdo:** impulso, inconsistência, tempo de monitoramento e abandono de regras; frase-pivô para método.
- **Layout:** 2×2 no mobile apenas se cada card couber com conforto; caso contrário, uma coluna/duas colunas. Vermelho restrito a ícones e pequenos acentos.
- **CTA:** “Ver uma forma mais organizada” → `#metodo`.
- **Roller:** “menos impulso • mais método • mais controle • mais consistência”.
- **Movimento:** cards surgem sem tremor ou alerta agressivo.
- **Aceite:** não presume perdas financeiras nem explora ansiedade; texto de card é curto e legível.

## 4. Método — `#metodo`

- **Objetivo:** explicar o novo mecanismo e preservar o papel ativo do usuário.
- **Conteúdo:** aprender, testar, configurar, automatizar e acompanhar; conta demo como etapa, não garantia.
- **Layout:** timeline vertical no mobile e horizontal/alternada no desktop; números, ícones lineares e uma frase por etapa.
- **CTA:** “Ver o Robô na prática” → `#demonstracao`.
- **Roller:** repetir os cinco verbos na ordem.
- **Movimento:** progressão por etapa com `IntersectionObserver`; sem linha desenhada continuamente em movimento reduzido.
- **Aceite:** “automatizar” não elimina “acompanhar”; sticky CTA só pode aparecer após esta seção entrar em viewport.

## 5. Demonstração e benefícios — `#demonstracao`

- **Objetivo:** provar o mecanismo e traduzir recursos em utilidade.
- **Conteúdo:** vídeo/captura real do painel; até quatro pares “recurso confirmado → benefício de processo”; legenda ou transcrição.
- **Layout:** shell de mídia 16:9 e lista lateral no desktop; no mobile, mídia seguida de lista. Nada de mockup falso apresentado como produto.
- **CTA:** “Conhecer a estrutura completa” → `#entrega`.
- **Roller:** “defina parâmetros • teste • execute • acompanhe”.
- **Movimento:** poster estático; vídeo carrega após play; benefício ativo pode acompanhar capítulo sem autoplay obrigatório.
- **Aceite:** cada afirmação tem evidência do produto; sem asset real, usar diagrama claramente ilustrativo ou adiar a prova.

## 6. Estrutura completa — `#entrega`

- **Objetivo:** construir valor mostrando adoção, não apenas acesso ao robô.
- **Conteúdo:** tecnologia, formação, implementação e continuidade; somente itens e escopos confirmados.
- **Layout:** quatro acordeões acessíveis com resumo sempre visível; um aberto por padrão apenas se isso reduzir esforço.
- **CTA:** “Ver para quem é” → `#compatibilidade`.
- **Roller:** “tecnologia • formação • conta demo • onboarding • suporte”.
- **Movimento:** expansão curta baseada em altura/grade; respeitar reduced motion.
- **Aceite:** botões têm `aria-expanded`; não exibir comunidade, biblioteca, instalação ou acesso imediato sem confirmação.

## 7. Prova e autoridade — `#provas`

- **Objetivo:** sustentar confiança antes de qualificar e apresentar preço.
- **Conteúdo:** prioridade para demonstração real, documentação, processo de teste e credenciais verificadas; prova social é opcional.
- **Layout:** bloco editorial com uma prova principal e até três sinais de confiança; sem carrossel automático.
- **CTA:** “Ver se é compatível comigo” → `#compatibilidade`.
- **Roller:** usar apenas termos verificáveis, como “demonstração real • processo documentado”.
- **Movimento:** reveal simples; números não usam contagem animada.
- **Aceite:** toda prova possui fonte, autorização e contexto; se não houver prova, seção reduzida a evidência técnica honesta.

## 8. Compatibilidade e qualificação — `#compatibilidade`

- **Objetivo:** permitir autoqualificação e evitar compra inadequada.
- **Conteúdo:** “é para”, “não é para”, plataformas/mercados, requisitos, papel do usuário e limites — todos confirmados.
- **Layout:** dois painéis contrastantes e tabela/lista de compatibilidade; vermelho apenas no “não é para” como sinal semântico.
- **CTA:** “Ver a oferta de R$197” → `#oferta`.
- **Roller:** “confira requisitos • entenda os limites • decida com clareza”.
- **Movimento:** sem animação além de fade/translate curto.
- **Aceite:** compatibilidades ausentes são marcadas internamente como pendência, nunca publicadas por inferência.

## 9. Oferta — `#oferta`

- **Objetivo:** apresentar entrega e investimento com máxima clareza.
- **Conteúdo:** nome, pilares confirmados, “Investimento total: R$197”, condições aprovadas, aviso de risco e ação primária.
- **Layout:** card central com contraste forte; sem preço riscado, parcela, falsa economia ou excesso de glow.
- **CTA:** “Acessar o Robô Trader” → destino pendente; secundário de contato apenas se canal oficial for fornecido.
- **Roller:** “aprenda • teste • configure • acompanhe”.
- **Movimento:** `ViewOffer` uma vez quando metade do card entra na viewport; preço sem contagem.
- **Aceite:** único valor é R$197; `InitiateCheckout` só dispara no clique que realmente inicia checkout.

## 10. Redução de risco — `#seguranca`

- **Objetivo:** responder “como começo com responsabilidade?”.
- **Conteúdo:** conta demo, onboarding, suporte, acompanhamento e política de reembolso apenas se confirmados; aviso de risco visível.
- **Layout:** checklist curto; política formal em callout sem selo exagerado.
- **CTA:** “Revisar dúvidas frequentes” → `#faq`.
- **Roller:** opcional e compartilhado com FAQ para evitar ruído.
- **Movimento:** nenhum efeito decorativo necessário.
- **Aceite:** redução de risco operacional não é descrita como eliminação de risco financeiro.

## 11. FAQ — `#faq`

- **Objetivo:** resolver objeções restantes e revelar pendências com honestidade.
- **Conteúdo:** funcionamento, experiência, demo, compatibilidade, suporte, pagamento e risco, somente com respostas aprovadas.
- **Layout:** acordeão de uma coluna, headings reais e controles de teclado.
- **CTA:** “Voltar à oferta” → `#oferta` após o último item; não repetir entre perguntas.
- **Roller:** nenhum exclusivo; usar transição tipográfica curta para fechamento.
- **Movimento:** abertura rápida; sem rolagem forçada.
- **Aceite:** perguntas não escondem condições materiais e permanecem úteis sem JavaScript.

## 12. Fechamento emocional — `#decisao`

- **Objetivo:** reconectar a aspiração inicial ao processo responsável e permitir decisão.
- **Conteúdo:** síntese de mercado global, organização, aprendizado, teste e controle; preço e risco; rodapé legal.
- **Layout:** composição aberta com mapa abstrato leve; CTA único e informações legais.
- **CTA:** “Começar com a estrutura” → mesmo destino real da oferta.
- **Roller:** “conhecimento • teste • tecnologia • acompanhamento”.
- **Movimento:** glow estático controlado e reveal único.
- **Aceite:** nenhuma promessa nova surge no fechamento; destino, evento e preço coincidem com a oferta.
