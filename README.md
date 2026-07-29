# Robô Trader — protótipo funcional

Landing page mobile-first da Etapa 2. O protótipo implementa a experiência completa, mas mantém checkout, WhatsApp, VSL real, Meta Pixel e deploy de produção desativados até que os dados oficiais sejam confirmados.

O investimento total oficial mostrado na página é **R$197**. Não existe parcelamento, desconto, preço anterior, garantia ou resultado prometido.

## Executar localmente

Na raiz do projeto, inicie um servidor estático:

```powershell
python -m http.server 4173
```

Depois, abra `http://localhost:4173/`. ES Modules podem não funcionar corretamente ao abrir `index.html` diretamente pelo sistema de arquivos.

## Estrutura

```text
index.html                    Conteúdo semântico e as 12 seções
assets/css/                   Tokens, base, componentes, seções e responsividade
assets/js/                    Configuração e interações progressivas
assets/images/                SVGs leves do protótipo
references/                   Referências conceituais; não são carregadas pela página
docs/                         Produto, UX, copy, técnica, tracking, QA e planos
```

Não há `package.json`, build obrigatório, framework ou dependência de runtime.

Capturas verificadas da Etapa 2 estão em `docs/qa/screenshots/`, nas larguras 390, 768 e 1440 px.

## Editar conteúdo e visual

- Copy e ordem das seções: `index.html`, sempre confrontando `docs/copy/CLAIMS_AND_GUARDRAILS.md`.
- Cores, medidas e tipografia: `assets/css/tokens.css`.
- Componentes: `assets/css/components.css`.
- Composições específicas: `assets/css/sections.css`.
- Breakpoints: `assets/css/responsive.css`.
- Movimento e reduced motion: `assets/css/motion.css`.

As seis imagens em `references/visual/mobile-sections/` são somente direção conceitual. Não as copie para assets de produção e não use textos, preços ou provas existentes nelas.

## Runtime config

`assets/js/runtime-config.js` é público e não pode conter segredos. Ele prevê:

- `metaPixelId`;
- `checkoutUrl`;
- `whatsappNumber` e `whatsappMessage`;
- `videoUrl` e `videoPoster`;
- `productName`, `productId`, `price` e `currency`;
- `companyName` e `supportEmail`;
- consentimento, prova social opcional e debug local.

Use `runtime-config.example.js` como contrato. O preço deve permanecer `197`, a moeda `BRL` e campos desconhecidos devem continuar vazios. Na Etapa 3, valores reais podem ser injetados pelo processo de hospedagem ou por uma cópia controlada do arquivo, sem colocar credenciais no navegador.

## Inserir a VSL

1. Forneça URL oficial, poster, legenda/transcrição e autorização.
2. Preencha `videoUrl` e, se necessário, `videoPoster`.
3. Confirme no painel de rede que o vídeo só é solicitado após o clique.
4. Teste início, 25%, 50%, 75% e conclusão.

Quando `videoUrl` está vazio, o botão abre um diálogo acessível e nenhum vídeo é baixado.

Se JavaScript estiver desabilitado ou o módulo principal falhar, a classe `no-js` mantém a navegação principal exposta, todo o conteúdo visível e os painéis dos acordeões abertos para leitura.

## Substituir imagens

Use SVG para marca/ícones e AVIF/WebP responsivos para fotografia. Defina dimensões, origem, licença e texto alternativo. O poster deve permanecer abaixo do orçamento descrito em `docs/technical/PERFORMANCE_BUDGET.md`.

## Tracking e consentimento

O helper em `assets/js/tracking.js` preserva UTMs permitidas, registra origem de CTAs, deduplica eventos e só pode carregar o Meta Pixel quando houver simultaneamente:

1. `metaPixelId` válido;
2. consentimento aceito.

Com a configuração atual, não existe chamada ao Meta Pixel. `InitiateCheckout` só ocorre quando `checkoutUrl` for real. Não existe evento de interface para compra.

## Validação

```powershell
Get-ChildItem assets/js/*.js | ForEach-Object { node --check $_.FullName }
```

Além da validação sintática, testar links, menu, VSL/fallback, acordeões, timeline, sticky CTA, diálogo, consentimento, UTMs e reduced motion. Viewports mínimos: 320, 360, 375, 390, 430, 768, 1024 e 1440 px.

## Pendências para a Etapa 3

- logo oficial e identidade final;
- VSL, poster final e transcrição;
- interface/capturas reais do produto;
- compatibilidades e requisitos técnicos;
- prova e autoridade verificáveis;
- checkout, pagamento e política de reembolso;
- WhatsApp, suporte e dados da empresa;
- Pixel ID, eventual CAPI e confirmação real de compra;
- domínio, canonical, Open Graph final, termos e privacidade;
- testes finais em Safari/iOS, Instagram in-app browser e staging.

Consulte `docs/plans/STAGE_3_QA_PLAN.md` antes de qualquer integração ou publicação.
