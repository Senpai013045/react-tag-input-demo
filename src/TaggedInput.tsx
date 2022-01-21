import React, { useEffect, useMemo } from "react";
import { SelectedTags } from "./SelectedTags";
import styles from "./TaggedInput.module.css";
import { Tag } from "./types";

interface Props {
  tags: Array<Tag>;
  onChange: (tags: Tag[]) => void;
}

export const TaggedInput: React.FC<Props> = ({ tags, onChange }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    //if value if empty and user tries backspace, remove last tag
    if (val === "" && selectedTags.length > 0) {
      setSelectedTags(selectedTags.slice(0, -1));
      return;
    }
    setInputValue(val);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const filteredTags = useMemo(() => {
    const filterFunction = (tag: Tag) => {
      return tag.value.toLowerCase().includes(inputValue.toLowerCase());
    };

    return tags.filter(filterFunction).slice(0, 10);
  }, [inputValue, tags]);

  const handleAddTag = (tag: Tag) => {
    const oldtags = new Set(selectedTags);
    oldtags.add(tag);
    const newTags = Array.from(oldtags);
    setSelectedTags(newTags);
    onChange(newTags);
    setInputValue("");
  };

  const handleRemoveTag = (tag: Tag) => {
    const newTags = selectedTags.filter((t) => t.id !== tag.id);
    setSelectedTags(newTags);
    onChange(newTags);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //if user presses backspace and input is empty, remove last tag
    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      selectedTags.length > 0
    ) {
      if (selectedTags.length > 0) {
        handleRemoveTag(selectedTags[selectedTags.length - 1]);
      }
    }
    //if filteredTags length is greater than zero and user presses enter, add tag
    if (filteredTags.length > 0 && event.key === "Enter") {
      handleAddTag(filteredTags[0]);
      setInputValue("");
    }
  };

  useEffect(() => {
    //if user clicks outside container set isFocused to false
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    //add event listener
    document.addEventListener("mousedown", handleClickOutside);
    //return function to clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  return (
    <div ref={containerRef}>
      <div
        className={`${styles.inputContainer} ${
          isFocused ? styles.focused : ""
        }`}
      >
        <SelectedTags
          onClickDelete={(tag) => handleRemoveTag(tag)}
          tags={selectedTags}
        />
        <input
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          className={styles.input}
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
        />
      </div>
      {isFocused && (
        <ul>
          {filteredTags.map((tag) => (
            <li
              key={tag.id}
              className={selectedTags.includes(tag) ? styles.disabledTag : ""}
            >
              {tag.value} <button onClick={() => handleAddTag(tag)}>+</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
