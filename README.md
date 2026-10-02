# Robô Trader

Landing page estática do Robô Trader, com checkout oficial Hotmart, VSL carregada sob demanda e componentes progressivos em JavaScript puro.

## Executar Localmente

Na raiz do projeto, inicie um servidor estático:

```powershell
python -m http.server 4173
```

Depois, abra `http://localhost:4173/`. ES Modules podem não funcionar corretamente ao abrir `index.html` diretamente pelo sistema de arquivos.

## Estrutura

```text
index.html                    Conteúdo semântico da landing page
assets/css/                   Tokens, base, componentes, seções e responsividade
assets/js/                    Configuração e interações progressivas
assets/images/                Imagens otimizadas, logos, posters e ícones
references/                   Referências conceituais; não são carregadas pela página
docs/                         Produto, UX, copy, técnica, tracking, QA e planos
```

Não há `package.json`, build obrigatório, framework ou dependência de runtime.

## Runtime Config

`assets/js/runtime-config.js` é público e não pode conter segredos. Ele centraliza:

- `checkoutUrl`;
- `videoPoster`;
- dados do produto e preço;
- preferências de consentimento;
- flags opcionais de tracking e debug local.

O checkout oficial atual é `https://pay.hotmart.com/B96582866Y?off=6k2dunwv`.

## VSL

A VSL principal fica no hero e usa `data-video-src` no `index.html`. O arquivo de vídeo não é solicitado no carregamento inicial; o `src` é aplicado somente quando o visitante clica para assistir.

## Validação

```powershell
Get-ChildItem assets/js/*.js | ForEach-Object { node --check $_.FullName }
```

Além da validação sintática, testar menu, VSL, carrossel, acordeões, certificado, sticky CTA, consentimento, checkout e ausência de overflow em mobile, tablet e desktop.
