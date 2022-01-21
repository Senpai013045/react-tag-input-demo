import { Tag } from "./types";
import styles from "./Suggestions.module.css";

interface Props {
  tags: Tag[];
  selectedTags: Tag[];
  onAddClick: (tag: Tag) => void;
}

export const Suggestions: React.FC<Props> = ({
  tags,
  selectedTags,
  onAddClick,
}) => {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <li
          key={tag.id}
          className={selectedTags.includes(tag) ? styles.disabledTag : ""}
        >
          {tag.value} <button onClick={() => onAddClick(tag)}>+</button>
        </li>
      ))}
    </ul>
  );
};
