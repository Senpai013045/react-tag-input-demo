import { Tag } from "./types";
import styles from "./SelectedTags.module.css";

interface Props {
  tags: Tag[];
  onClickDelete: (tag: Tag) => void;
}

export const SelectedTags: React.FC<Props> = ({ tags, onClickDelete }) => {
  return (
    <>
      {tags.map((tag) => {
        return (
          <span key={tag.id} className={styles.selectedTag}>
            {tag.value}
            <button onClick={() => onClickDelete(tag)}>x</button>
          </span>
        );
      })}
    </>
  );
};
