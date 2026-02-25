---
title: ドロワーの実装
description: アクセシビリティに配慮したドロワーを実装してみましたので、まとめてみます
publishedAt: 2026/02/15
category: accessibility
draft: true
---

## デモサイト

- [dialogパターンのデモ](GitHub Pagesリンク)
- [aria属性のみパターンのデモ](GitHub Pagesリンク)

それぞれのソースコードはGitHubで公開しています：

- [dialogパターン - GitHubリポジトリ](リンク)
- [aria属性のみパターン - GitHubリポジトリ](リンク)

## 2つの実装パターンについて

### dialogパターン

- `<dialog>`要素を使用しています
- ブラウザのネイティブ機能を活用
- モダンなアプローチ

### aria属性のみパターン

- 古いブラウザにも対応

## 技術スタック

こちらのデモは以下のスタックで作られています。

- Astro.js
- TypeScript

## 注意点

- コンポーネントのディレクトリや命名は適宜変更してください。

## ドロワーメニューでdialogを使用する場合

### MenuButtonコンポーネント

```astro
---
import type { HTMLAttributes } from "astro/types";
type Props = {
  open?: boolean;
  className?: string;
} & Omit<
  HTMLAttributes<"button">,
  "aria-label" | "aria-expanded" | "aria-controls" | "class"
>;

const { open = true, className } = Astro.props;
const ariaExpanded: HTMLAttributes<"button">["aria-expanded"] = open
  ? "true"
  : "false";
const ariaControls: HTMLAttributes<"button">["aria-controls"] = "menu";
const classList: HTMLAttributes<"button">["class"] = `${className ?? ""} ${open ? "menu-button close-button" : "menu-button open-button"}`;
const ariaLabel: HTMLAttributes<"button">["aria-label"] = open
  ? "メニューを閉じる"
  : "メニューを開く";
---

<button
  class={classList}
  aria-label={ariaLabel}
  aria-expanded={ariaExpanded}
  aria-controls={ariaControls}
>
  <span class="menu-button__line -first" aria-hidden="true"></span>
  <span class="menu-button__line -second" aria-hidden="true"></span>
</button>

<style lang="scss">
  @use "../styles/mixin" as *;
  @use "../styles/functions" as *;
  @use "../styles/extends" as *;
  .menu-button {
    width: 50px;
    height: 50px;
    background-color: var(--black-color);
    position: relative;
    z-index: 1;
    &__line {
      height: 2px;
      border-radius: 1px;
      background-color: var(--white-color);
      display: block;
      width: 28px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition:
        top 0.3s,
        transform 0.3s;
    }
    &.open-button > .menu-button__line {
      &.-first {
        top: 20px;
      }
      &.-second {
        top: 28px;
      }
    }
    &.close-button > .menu-button__line {
      &.-first {
        top: 50%;
        transform: translate(-50%, -50%) rotate(210deg);
      }
      &.-second {
        top: 50%;
        transform: translate(-50%, -50%) rotate(-30deg);
      }
    }
  }
</style>
```

### Menuコンポーネント

```astro
---
import MenuButton from "../components/MenuButton.astro";
---

<dialog class="menu" id="menu">
  <MenuButton />
  <div class="menu__inner">
    <nav class="menu__navigation" aria-label="メニュー">
      <ul class="menu__list">
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー1</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー2</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー3</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー4</a>
        </li>
      </ul>
    </nav>
  </div>
</dialog>

<style lang="scss">
  @use "../styles/mixin" as *;
  @use "../styles/functions" as *;
  @use "../styles/extends" as *;
  .menu {
    background-color: var(--white-color);
    width: 100%;
    max-height: 100vh;
    padding: 100px var(--spacing-md);
    transition: opacity 0.5s;
    opacity: 0;
    margin: 0;

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.5s;
      opacity: 0;
    }
    :global(.menu-button) {
      position: absolute;
      top: calc(var(--header-height) / 2);
      transform: translateY(-50%);
      right: var(--spacing-md);
    }
    &.-open {
      opacity: 1;
      &::backdrop {
        opacity: 1;
      }
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    &__item {
      font-size: var(--font-size-2xl);
    }
  }

  body.-open {
    overflow: hidden;
  }
</style>

<script>
  document.addEventListener("DOMContentLoaded", (): void => {
    /* 要素の取得 */
    const body = document.querySelector<HTMLBodyElement>("body");
    const menu = document.querySelector<HTMLDialogElement>(".menu");
    const openButton =
      document.querySelector<HTMLButtonElement>(".open-button");
    const closeButton =
      document.querySelector<HTMLButtonElement>(".close-button");

    /* 要素が存在しない場合は処理を中断 */
    if (!menu || !openButton || !closeButton || !body) return;

    /* フォーカス可能な要素を取得 */
    const focusableAllElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    /* フォーカス可能な要素の配列を作成 */
    const focusableElements = Array.from(focusableAllElements).filter(
      (el) => el !== closeButton,
    );
    /* フォーカス可能な要素の最初の要素を取得 */
    const firstFocusableElement = focusableElements[0];

    /* メニューを開く関数 */
    const openMenu = (): void => {
      menu.showModal();
      addOpenClass(menu);
      addOpenClass(body);
      firstFocusableElement?.focus();
    };

    /* メニューを閉じる関数 */
    const closeMenu = (): void => {
      removeOpenClass(menu);
      removeOpenClass(body);
      menu.addEventListener(
        "transitionend",
        () => {
          menu.close();
        },
        { once: true },
      );
    };

    /* 開閉状態を管理するクラスを追加する関数 */
    const addOpenClass = (el: HTMLElement): void => el.classList.add("-open");

    /* 開閉状態を管理するクラスを削除する関数 */
    const removeOpenClass = (el: HTMLElement): void =>
      el.classList.remove("-open");

    /* メニューが開いているかどうかを判定する関数 */
    const isMenuOpen = (): boolean => menu.classList.contains("-open");

    /* メニューを開くボタンをクリックした時の処理 */
    openButton.addEventListener("click", openMenu);
    /* メニューを閉じるボタンをクリックした時の処理 */
    closeButton.addEventListener("click", closeMenu);

    /* メニューが閉じた時の処理（Escapeキー対応） */
    menu.addEventListener("close", () => {
      if (isMenuOpen()) {
        removeOpenClass(menu);
        removeOpenClass(body);
      }
    });
  });
</script>
```

## ドロワーメニューでdialogを使用しない場合

### MenuButtonコンポーネント

```astro
---
import type { HTMLAttributes } from "astro/types";
const { open = false } = Astro.props;
const classList: HTMLAttributes<"button">["class"] = `${open ? "menu-button close-button" : "menu-button open-button"}`;
---

<button
  class={classList}
  aria-label="メニューを開く"
  aria-expanded="false"
  aria-controls="menu"
>
  <span class="menu-button__line -first" aria-hidden="true"></span>
  <span class="menu-button__line -second" aria-hidden="true"></span>
</button>

<style lang="scss">
  .menu-button {
    width: 50px;
    height: 50px;
    background-color: var(--black-color);
    position: relative;

    &__line {
      height: 2px;
      border-radius: 1px;
      background-color: var(--white-color);
      display: block;
      width: 28px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition:
        top 0.3s,
        transform 0.3s;
      &.-first {
        top: 20px;
      }
      &.-second {
        top: 28px;
      }
    }

    &.-open > .menu-button__line {
      &.-first {
        top: 50%;
        transform: translate(-50%, -50%) rotate(210deg);
      }
      &.-second {
        top: 50%;
        transform: translate(-50%, -50%) rotate(-30deg);
      }
    }
  }
</style>
```

### Menuコンポーネント

```astro
---
import MenuButton from "../components/MenuButton.astro";
---

<div class="menu-container">
  <MenuButton open={false} />
  <div class="menu" id="menu" aria-hidden="true">
    <nav class="menu__navigation" aria-label="メニュー">
      <ul class="menu__list">
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー1</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー2</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー3</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="/">メニュー4</a>
        </li>
      </ul>
    </nav>
  </div>
</div>

<style lang="scss">
  .menu {
    background-color: var(--white-color);
    position: fixed;
    width: 100%;
    height: calc(100dvh - var(--header-height));
    z-index: 9999;
    overflow: auto;
    top: var(--header-height);
    left: 0;
    padding: var(--spacing-md);
    color: var(--black-color);
    transition:
      opacity 0.5s,
      visibility 0.5s;
    opacity: 0;
    visibility: hidden;
    &.-open {
      opacity: 1;
      visibility: visible;
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    &__item {
      font-size: var(--font-size-2xl);
    }
  }

  body.-open {
    overflow: hidden;
  }
</style>

<script>
  document.addEventListener("DOMContentLoaded", (): void => {
    /* 要素の取得 */
    const body = document.querySelector<HTMLBodyElement>("body");
    const menu = document.querySelector<HTMLDivElement>(".menu");
    const button = document.querySelector<HTMLButtonElement>(".menu-button");
    const container = document.querySelector<HTMLDivElement>(".menu-container");

    /* 要素が存在しない場合は処理を中断 */
    if (!menu || !button || !body || !container) return;

    /* フォーカス可能な要素を取得 */
    const focusableAllElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    /* フォーカス可能な要素の配列を作成 */
    const focusableElements = [...Array.from(focusableAllElements), button];
    /* フォーカス可能な要素の最初の要素を取得*/
    const firstFocusableElement = focusableElements[0];

    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    let isMenuOpen = false;

    /* メニューを開く関数 */
    const openMenu = (isKeyboardEvent = false): void => {
      isMenuOpen = true;
      addOpenClass(menu);
      addOpenClass(body);
      addOpenClass(button);
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "メニューを閉じる");
      menu.setAttribute("aria-hidden", "false");

      // フォーカス移動: DOM更新とレンダリング完了を待つ
      if (isKeyboardEvent) {
        // キーイベントの時だけ、requestAnimationFrameを2回使用して確実に動作させる
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // メニューが表示可能な状態であることを確認してからフォーカス移動
            if (
              menu.classList.contains("-open") &&
              menu.getAttribute("aria-hidden") === "false"
            ) {
              firstFocusableElement?.focus();
            }
          });
        });
      }
    };

    /* メニューを閉じる関数 */
    const closeMenu = (): void => {
      isMenuOpen = false;
      removeOpenClass(menu);
      removeOpenClass(body);
      removeOpenClass(button);
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "メニューを開く");
      menu.setAttribute("aria-hidden", "true");
    };

    /* 開閉状態を管理するクラスを追加する関数 */
    const addOpenClass = (el: HTMLElement): void => el.classList.add("-open");

    /* 開閉状態を管理するクラスを削除する関数 */
    const removeOpenClass = (el: HTMLElement): void =>
      el.classList.remove("-open");

    /* メニューを開くボタンをクリックした時の処理 */
    button.addEventListener("click", (): void => {
      if (!isMenuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    /* ボタンのキーボードイベント処理（Enterでメニューを開閉） */
    button.addEventListener("keydown", (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!isMenuOpen) {
          openMenu(true);
        } else {
          closeMenu();
        }
      }
    });

    /* メニューのキーイベント処理 */
    container.addEventListener("keydown", (e: KeyboardEvent): void => {
      if (e.key === "Escape" && isMenuOpen) {
        e.preventDefault();
        closeMenu();
        button.focus();
      }
      /* フォーカストラップの処理 */
      if (e.key === "Tab" && isMenuOpen) {
        e.preventDefault();
        const activeElement = document.activeElement;
        if (!(activeElement instanceof HTMLElement)) return;
        const currentIndex = focusableElements.indexOf(activeElement);
        if (e.shiftKey) {
          if (currentIndex === 0) {
            lastFocusableElement?.focus();
          } else {
            focusableElements[currentIndex - 1]?.focus();
          }
        } else {
          if (currentIndex === focusableElements.length - 1) {
            firstFocusableElement?.focus();
          } else {
            focusableElements[currentIndex + 1]?.focus();
          }
        }
      }
    });
  });
</script>
```
