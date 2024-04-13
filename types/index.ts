export interface DataItem {
    _id:number
    id: number;
    title: string;
    description: string;
    status: string;
    upvotes: number;
    category: string;
    comments: Comment[];
   
  }

  export interface CardCommentData {
    id: number;
    text: string;
    replies?: CardCommentData[]; 
  }
  
  export interface CardProps {
    title: string;
    description: string;
    status: string;
    upvotes: number;
    comments: CardCommentData[]; 
}
export interface Comment {
   
    replies?: Comment[]; 
  }

 export type Reply = {
    _id: string; 
    content: string;
    user: {
        name: string;
        username: string;
      
    };
  
}

