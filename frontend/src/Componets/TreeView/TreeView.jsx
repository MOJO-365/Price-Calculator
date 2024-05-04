
// import { useState } from "react";
// import "./treeView.css";
// const TreeView = () => {
//    const [currentQuestion, setCurrentQuestion] = useState("question1");

//    // Define the questions and their connections
//    const questions = {
//      question1: {
//        text: "What is your favorite color?",
//        options: [
//          { text: "Blue", nextQuestion: "question2" },
//          { text: "Red", nextQuestion: "question4" },
//          { text: "Green", nextQuestion: "question3" },
//        ],
//      },
//      question2: {
//        text: "Why do you like blue?",
//        options: [
//          { text: "It's calming", nextQuestion: "question5" },
//          { text: "It's vibrant", nextQuestion: "question5" },
//        ],
//      },
//      question3: {
//        text: "Why do you like green?",
//        options: [
//          { text: "It's soothing", nextQuestion: "question5" },
//          { text: "It's refreshing", nextQuestion: "question5" },
//        ],
//      },
//      question4: {
//        text: "Why do you like red?",
//        options: [
//          { text: "It's passionate", nextQuestion: "question3" },
//          { text: "It's energetic", nextQuestion: "question3" },
//        ],
//      },
//      question5: {
//        text: "Thank you for participating!",
//        options: [],
//      },
//    };

//    const TreeNode = ({ questionId }) => {
//      const question = questions[questionId];

//      if (!question) {
//        return null;
//      }

//      return (
//        <li>
//          <input type="checkbox" id={`trigger-${questionId}`} />
//          <label htmlFor={`trigger-${questionId}`}>{question.text}</label>
//          <ul className="pure-tree">
//            {question.options.map((option, index) => (
//              <li key={index}>
//                <TreeNode questionId={option.nextQuestion} />
//              </li>
//            ))}
//          </ul>
//        </li>
//      );
//    };
  
//   return (
//     <>
//       <header>
//   <h1>Pure <strong>CSS</strong> Tree</h1>
//   <p>...a folders tree view, without JS :P</p>
// </header>
// <ul id="compositions-list" class="pure-tree main-tree">
//   <li>
//     <input type="checkbox" id="trigger-views" checked="checked" />
//     <label for="trigger-views">views</label>
//     <ul class="pure-tree">
//       <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//       <li>
//         <input type="checkbox" id="trigger-layout" />
//         <label for="trigger-layout">layout</label>
//         <ul class="pure-tree">
//           <li>
//             <input type="checkbox" id="trigger-base" />
//             <label for="trigger-base">base</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-footer" />
//             <label for="trigger-footer">footer</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//         </ul>
//       </li>
//       <li>
//         <input type="checkbox" id="trigger-partials" />
//         <label for="trigger-partials">partials</label>
//         <ul class="pure-tree">
//           <li>
//             <input type="checkbox" id="trigger-header" />
//             <label for="trigger-header">header</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-list" />
//             <label for="trigger-list">list</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-message" />
//             <label for="trigger-message">message</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-panel" />
//             <label for="trigger-panel">panel</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-prompt" />
//             <label for="trigger-prompt">prompt</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-sub-header" />
//             <label for="trigger-sub-header">sub-header</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//         </ul>
//       </li>
//       <li>
//         <input type="checkbox" id="trigger-ui" />
//         <label for="trigger-ui">ui</label>
//         <ul class="pure-tree">
//           <li>
//             <input type="checkbox" id="trigger-box-color" />
//             <label for="trigger-box-color">box-color</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-button" />
//             <label for="trigger-button">button</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-charts" />
//             <label for="trigger-charts">charts</label>
//             <ul class="pure-tree">
//               <li>
//                 <input type="checkbox" id="trigger-border" />
//                 <label for="trigger-border">border</label>
//                 <ul class="pure-tree">
//                   <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//                 </ul>
//               </li>
//               <li>
//                 <input type="checkbox" id="trigger-progress" />
//                 <label for="trigger-progress">progress</label>
//                 <ul class="pure-tree">
//                   <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-check" />
//             <label for="trigger-check">check</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-dropdown" />
//             <label for="trigger-dropdown">dropdown</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-input" />
//             <label for="trigger-input">input</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-radio" />
//             <label for="trigger-radio">radio</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-rating-stars" />
//             <label for="trigger-rating-stars">rating-stars</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-textarea" />
//             <label for="trigger-textarea">textarea</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//           <li>
//             <input type="checkbox" id="trigger-toggle" />
//             <label for="trigger-toggle">toggle</label>
//             <ul class="pure-tree">
//               <li class="pure-tree_link"><a href="" title="index.jade" target="_blank">index.html</a></li>
//             </ul>
//           </li>
//         </ul>
//       </li>
//     </ul>
//   </li>
// </ul>
//     </>
//   );
// }




// export default TreeView;