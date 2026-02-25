import styles from "./index.module.scss";
import clsx from "clsx";

export interface MemoProps {
  title?: string;
  type: "memo" | "warning" | "success" | "error";
  children: React.ReactNode;
}

export const Memo = ({ title, type, children }: MemoProps) => {
  const typeClass = `-${type}`;
  const defaultTitle = {
    memo: "メモ",
    warning: "警告",
    success: "成功",
    error: "エラー",
  }[type];
  const displayTitle = title ?? defaultTitle;

  return (
    <div className={clsx(styles.memo, styles[typeClass])}>
      <p className={styles.title}>{displayTitle}</p>
      {children}
    </div>
  );
};
