import { useState, useRef, useEffect } from "react";
import { Container, SearchInput, IconArrowForward, IconSearch } from "./styles";

export default function Search() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showShearchInput = isHovered || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showShearchInput]);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={showShearchInput}
    >
      <SearchInput ref={targetRef} showSearchInput={showShearchInput} />
      {showShearchInput ? <IconArrowForward /> : <IconSearch />}
    </Container>
  );
}
