import { useEffect, useState } from 'react';

export default function TextAreaWithWordCount({
  rows,
  cols,
  type,
  name,
  htmlForId,
  className,
  placeholder,
  value,
  onChange,
  maxLength,
  ariaLabel,
  errorMsg,
}) {
  // character count
  const [charCount, setCharCount] = useState(0);
  const [charLimit, setCharLimit] = useState(value.slice(charCount, maxLength));
  const [err, setErr] = useState(false);

  useEffect(() => {
    // update char count (including whitespaces)
    setCharCount(value.length);

    if (value.length >= maxLength) {
      setCharLimit(errorMsg);
      setErr(true);
    } else {
      setCharLimit(`${value.length} / ${maxLength}`);
      setErr(false);
    }
  }, [value]);

  return (
    <>
      <textarea
        rows={rows}
        cols={cols}
        type={type}
        id={htmlForId}
        name={name}
        aria-label={ariaLabel}
        placeholder={placeholder}
        className={className}
        // className={`'className' ${err && 'errorMsgBorder'}`}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      <div className={`${err && 'errorMsg'}`}>{charLimit}</div>
    </>
  );
}

// function TextAreaWithWordCount({ rows, cols, value, onChange, maxLength }) {
//   // character count
//   const [charCount, setCharCount] = useState(0);
//   const [charLimit, setCharLimit] = useState(value.slice(charCount, maxLength));
//   // const [charLimit, setCharLimit] = useState(`${charCount} / ${maxLength}`);

//   useEffect(() => {
//     // update char count (including whitespaces)
//     // setCharCount(value.slice(0, maxLength));
//     setCharCount(value.length);

//     // if (value.length >= maxLength) {
//     //   setCharLimit('You have reached the limit!');
//     // } else {
//     //   setCharLimit(`${value.length} / ${maxLength}`);
//     // }

//     value.length >= maxLength
//       ? setCharLimit('You have reached the limit!')
//       : setCharLimit(`${value.length} / ${maxLength}`);
//   }, [value]);

//   return (
//     <>
//       <textarea
//         rows={rows}
//         cols={cols}
//         type="text"
//         id="body"
//         name="body"
//         aria-label="body"
//         placeholder="Write something...."
//         className="input-text"
//         value={value}
//         onChange={onChange}
//         maxLength={maxLength}
//       />
//       <div>{charLimit}</div>
//     </>
//   );
// }

// function TextAreaWithWordCount({
//   rows,
//   cols,
//   limit,
//   value,
//   onChange,
//   maxLength,
// }) {
//   // word count
//   // const [wordCount, setWordCount] = useState(0);
//   // character count
//   const [charCount, setCharCount] = useState(0);

//   const [charLimit, setCharLimit] = useState(`${charCount} / ${maxLength}`);

//   useEffect(() => {
//     // // array of words
//     // const words = value.split(' ');

//     // // update word count
//     // let wordCount = 0;
//     // words.forEach((word) => {
//     //   if (word.trim() !== '') {
//     //     wordCount++;
//     //   }
//     // });
//     // setWordCount(wordCount);

//     // update char count (including whitespaces)
//     setCharCount(value.length);

//     if (value.length >= maxLength) {
//       setCharLimit('You have reached the maximum number of characters!');
//     } else {
//       setCharLimit(`${value.length} / ${maxLength}`);
//     }
//   }, [value]);

//   return (
//     <>
//       <textarea
//         rows={rows}
//         cols={cols}
//         type="text"
//         id="body"
//         name="body"
//         aria-label="body"
//         placeholder="Write something...."
//         className="input-text"
//         value={value}
//         onChange={onChange}
//         maxLength={maxLength}
//       />
//       <div>
//         <div>
//           {/* <p className="word-count">Word Count: {wordCount}</p> */}
//           {/* <p className="char-count">
//             Character Count (Including Whitespaces): {charCount}
//           </p> */}
//           {maxLength && <span>{charLimit}</span>}
//         </div>
//       </div>
//     </>
//   );
// }
