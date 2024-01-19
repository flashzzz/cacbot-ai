

interface IMenuItems {
    link: string;
    listItemIcon: string;
    listItemText: string;
}

export const MenuItems: IMenuItems[] = [
    {
        link: "/main/upload",
        listItemIcon: "upload-cloud",
        listItemText: "Upload Data",
    },
    {
        link: "/main/playground",
        listItemIcon: "book-open",
        listItemText: "Playground",
    },
    {
        link: "/main/tutorial",
        listItemIcon: "play",
        listItemText: "Tutorial",
    },
    {
        link: "/auth/login",
        listItemIcon: "user",
        listItemText: "My Account",
    },
]