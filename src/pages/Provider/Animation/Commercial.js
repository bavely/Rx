// import * as React from "react";

// import { useDencrypt } from "use-dencrypt-effect";

// const values = ["CHECK OUT RIVER'S EDGE PHARMACY NEWS","TYLENOL 8 HR 650MG", "FONDAPARINUX 5 MG/0.4ML", "ORBACTIV 400 MG VL", "OXALIPLATIN 50 MG/10ML"];

// const Example = () => {
//   const { result, dencrypt } = useDencrypt();

//   React.useEffect(() => {
//     let i = 0;

//     const action = setInterval(() => {
//       dencrypt(values[i]);

//       i = i === values.length - 1 ? 0 : i + 1;
//     }, 4000);

//     return () => clearInterval(action);
//   }, []);

//   return <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{result}</div>;
// };

// export default Example;