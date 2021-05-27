export interface ITreeNode {
    label: string,
    href: string
}


export class TreeNode implements ITreeNode {
    href: string = "";
    label: string = "";
}