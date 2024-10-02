import { Card } from '@components/index';
import { IArticle } from '@models/article';

export default function Home() {
  const articles: IArticle[] = [
    { id: 1, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 2, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 3, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 4, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 5, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 6, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 7, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 8, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 9, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' },
    { id: 10, title: 'Lorem Ipsum', description: 'Lorem Ipsum ...' }
  ];

  return (
      <main>
        <h1>HOME</h1>
        {articles.map((article, index) => (
          <Card key={index} article={article} />
        ))}
      </main>
  );
}
