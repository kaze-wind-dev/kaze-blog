---
title: AstroのHTMLAttributesとは何か
description: HTMLAttributesの使用方法について気になったので、挙動と使用方法を焦点に当ててまとめてみました。
publishedAt: 2026/02/11
category: accessibility
---

## HTMLAttributes とは

Astro.js で利用できる TypeScript の型です。
マークアップが有効な HTML 属性を使用しているかどうかを確認するための型を提供します。

以下の `a` タグを例に見てみます。

```astro
---
import type { HTMLAttributes } from "astro/types";
type AnchorAttr = HTMLAttributes<"a">;
type Props = AnchorAttr;

const { ...attrs } = Astro.props;
---

<a class="link-button" {...attrs}><slot /></a>
```

VSCode などで開いて実際に `type AnchorAttr` にフォーカスをしてみると、以下のように表示されることがわかります。

```ts
type AnchorAttr = {
  [x: `data-${string}`]: any;
  'class:list'?: (Record<string, boolean> | Record<any, any> | Iterable<string> | Iterable<any> | string) | undefined;
  download?: string | boolean | undefined | null | undefined;
  href?: string | URL | null | undefined;
  hreflang?: string | undefined | null | undefined;
  media?: string | undefined | null | undefined;
  name?: string | undefined | null | undefined;
  ping?: string | undefined | null | undefined;
  rel?: string | undefined | null | undefined;
  target?: astroHTML.JSX.HTMLAttributeAnchorTarget | null | undefined;
  type?: string | undefined | null | undefined;
  referrerpolicy?: astroHTML.JSX.HTMLAttributeReferrerPolicy | null | undefined;
  ... 189 more ...;
  onfullscreenerror?: string | undefined | null | undefined;
}
```

`HTMLAttributes` は指定したタグの属性を型情報として持っており、型安全に扱うことが可能となります。

---

## HTMLAttributes を使用すると何がいいのか

`HTMLAttributes` を使うことの最大のメリットは、属性情報を毎回型定義しなくても、後からコンポーネントへ追加することができる点にあります。

極端な例として、以下を挙げてみます。

> ※ 本来は `href` など必須の値は型として定義するかと思いますが、あくまで例なのでご了承ください。

```astro
---
import type { HTMLAttributes } from "astro/types";
type AnchorAttr = HTMLAttributes<"a">;
type Props = AnchorAttr;

const { ...attrs } = Astro.props;
---

<a {...attrs}><slot /></a>
```

```astro
---
import Layout from "../layouts/Layout.astro";
import LinkButton from "../components/LinkButton.astro";
---

<Layout>
  <LinkButton href="https://astro.build" class="link-button"
    >Click me!</LinkButton
  >
  <!-- ↓こっちはエラーになる -->
  <LinkButton
    href="https://astro.build"
    class="link-button"
    aria-hidden="Click me!">Click me!</LinkButton
  >
</Layout>
```

従来であれば型として定義していたところ、定義をしていなくても追加することができました。

また、試しに `aria-hidden="Click me!"` を追加したボタンも用意してみましたが、こちらは型エラーとなります。
これは、`aria-hidden` には `boolean | "false" | "true" | null | undefined` という型が決まっており、不一致となるのでエラーとなっています。

このように、コンポーネントにおいて後から属性値を追加する可能性が予想される場合には、こちらを使用しておくのが良いでしょう。

---

## どう使用するのがいいのか

本来、`href` などは型としてあらかじめ渡してある方がわかりやすいので、ユニオン型と `HTMLAttributes` を組み合わせて使用するのが良いかと思います。

必須なものは型としてあらかじめ加えておいて、残りを `HTMLAttributes` に任せるイメージです。

```astro
---
import type { HTMLAttributes } from "astro/types";
// 必須のプロパティと HTMLAttributes を組み合わせる
type Props = {
  href: string; // 必須
  variant?: "primary" | "secondary";
  class?: string;
} & HTMLAttributes<"a">;

const { href, variant = "primary", class: classNames, ...attrs } = Astro.props;
---

<a
  href={href}
  class:list={[classNames ?? "", "link-button", `link-button--${variant}`]}
  {...attrs}
>
  <slot />
</a>
```

---

## Omit と合わせて使用する

最も良い使い方として、`Omit` を組み合わせる方法があります。

先ほどの方法では、「`...attrs` の方でも属性値を与えられる」という問題点が存在していました。
この場合、コンポーネントの書き方によって反映される値が変わることがあり、挙動が安定しませんでした。

これを解決する方法として `Omit` を使用するのが有効です。

### Omit とは何か

型からプロパティを選択して、そのプロパティの型情報を除外するのが `Omit` です。
以下のように組み合わせて使うのが良さそうです。

```astro
---
import type { HTMLAttributes } from "astro/types";

type AnchorAttr = HTMLAttributes<"a">;
type Props = {
  href: string;
  variant?: "primary" | "secondary";
  class: string;
} & Omit<AnchorAttr, "href">;

const { variant = "primary", href, class: classNames, ...attrs } = Astro.props;
---

<a
  class={[
    classNames ?? "",
    variant === "primary" ? "link-button-primary" : "link-button-secondary",
  ]}
  href={href}
  {...attrs}
>
  <slot />
</a>
```

```astro
---
import Layout from "../layouts/Layout.astro";
import LinkButton from "../components/LinkButton.astro";
---

<Layout>
  <LinkButton href="https://astro.build" variant="secondary"
    >Click me!</LinkButton
  >
</Layout>
```

---

## 最後に

`HTMLAttributes` という型を見かけたので、実際に書いて細かく見てみましたが、大変便利な型であることがわかりました。

今後、使えそうな場面があれば積極的に使ってみたいと思います！

---

## 参考

- [公式ドキュメント - TypeScript](https://docs.astro.build/en/guides/typescript/)
- [サバイバルTypeScript - Omit\<T, Keys\>](https://typescriptbook.jp/)
