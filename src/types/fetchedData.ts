export interface fetchedData {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export interface TableProps {
    Data: fetchedData[];
    setData: React.Dispatch<React.SetStateAction<fetchedData[]>>;
}

export interface RowProps {
    index: number;
    el: fetchedData;
}