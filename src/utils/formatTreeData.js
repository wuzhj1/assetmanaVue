const result = [{ id: undefined, label: "", children: [] }];

export default function(menus) {
  treeData(menus, result);
  return result;
}
export const treeData = (menus, result) => {
         menus.forEach(item => {
           if (item.hidden === false) {
             let temp = { id: undefined, label: "", children: [] };
             temp.id = item.id;
             temp.label = item.name;
             result.push(temp);
             if (item.children && item.children.length) {
               treeData(item.children, result.children);
             }
           }
         });
       };
