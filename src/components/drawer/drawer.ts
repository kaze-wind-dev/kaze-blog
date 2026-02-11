document.addEventListener("DOMContentLoaded", function (): void {
  // 要素の取得
  const body = document.body;
  const button = document.querySelector<HTMLButtonElement>(".drawer-button");
  const overlay = document.querySelector<HTMLDivElement>(".drawer-overlay");
  const drawer = document.querySelector<HTMLDivElement>(".drawer");

  if (!button || !overlay || !drawer) return;

  // 開閉の状態を管理
  let isDrawerOpen: boolean = false;

  // フォーカス可能な要素
  const focusableSelectors =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  // drawer内のフォーカス可能な要素を取得し、nullの場合は除外する
  const getFocusableElements = (): HTMLElement[] => {
    const drawerElements = Array.from(
      drawer.querySelectorAll<HTMLElement>(focusableSelectors),
    ).filter((el): el is HTMLElement => el !== null);
    return button ? [...drawerElements, button] : drawerElements;
  };

  // ドロワーの操作
  const handleDrawer = (): void => {
    isDrawerOpen = !isDrawerOpen;

    const expanded = isDrawerOpen ? "true" : "false";
    const label = isDrawerOpen ? "メニューを閉じる" : "メニューを開く";
    const hidden = isDrawerOpen ? "false" : "true";

    button.classList.toggle("is-open");
    body.classList.toggle("is-open");
    overlay.classList.toggle("is-active");
    drawer.classList.toggle("is-open");
    button.setAttribute("aria-expanded", expanded);
    button.setAttribute("aria-label", label);
    drawer.setAttribute("aria-hidden", hidden);
  };

  const closeDrawer = (): void => {
    isDrawerOpen = false;

    button.classList.remove("is-open");
    body.classList.remove("is-open");
    overlay.classList.remove("is-active");
    drawer.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "メニューを開く");
    drawer.setAttribute("aria-hidden", "true");
    // 閉じた時にボタンにフォーカスを置く
    button.focus();
  };

  // ボタン操作による開閉
  button.addEventListener("click", handleDrawer);
  // wrapper要素をクリック時に閉じる
  overlay.addEventListener("click", closeDrawer);

  // キーボド操作の対応
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    // 開いている時にEscapeキーを押したら閉じる
    if (e.key === "Escape" && isDrawerOpen) {
      closeDrawer();
    }
    // 開いている時のTab操作
    if (e.key === "Tab" && isDrawerOpen) {
      e.preventDefault();

      // focus可能な要素を取得
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;
      // 最初と最後の要素を取得
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      // アクティブな要素の取得
      const currentElement = document.activeElement;
      // アクティブ要素がfocus可能な要素の配列のどこにあるか
      const currentIndex =
        currentElement instanceof HTMLElement
          ? focusableElements.indexOf(currentElement)
          : -1;
      // Shift Keyが押された時の制御
      if (e.shiftKey) {
        if (currentIndex <= 0) {
          lastElement?.focus();
        } else {
          focusableElements[currentIndex - 1]?.focus();
        }
      } else {
        if (
          currentIndex === -1 ||
          currentIndex >= focusableElements.length - 1
        ) {
          firstElement?.focus();
        } else {
          focusableElements[currentIndex + 1]?.focus();
        }
      }
    }
  });
});
