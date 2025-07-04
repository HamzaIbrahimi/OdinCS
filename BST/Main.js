import Tree from './BST.js';
import { prettyPrint } from './print.js';

const tree = new Tree([19, 77, 16, 14, 22, 49, 5, 10, 17, 66, 88]);
prettyPrint(tree.root);
console.log(tree.isBalanced() === true);
tree.levelOrder((x) => console.log(x.data));
console.log('----');
tree.preOrder(tree.root, (x) => console.log(x.data));
console.log('----');
tree.postOrder(tree.root, (x) => console.log(x.data));
console.log('----');
tree.inOrder(tree.root, (x) => console.log(x.data));
tree.insert(140);
tree.insert(200);
tree.insert(350);
prettyPrint(tree.root);
console.log(tree.isBalanced() === false);
tree.rebalance();
console.log(tree.isBalanced() === true);
tree.levelOrder((x) => console.log(x.data));
console.log('----');
tree.preOrder(tree.root, (x) => console.log(x.data));
console.log('----');
tree.postOrder(tree.root, (x) => console.log(x.data));
console.log('----');
tree.inOrder(tree.root, (x) => console.log(x.data));
