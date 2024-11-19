import Image from 'next/image';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';

import styles from './tabs.module.scss';

interface ITabsProps {
  tabs: {
    title: string;
    icon: {
      src: string;
      alt: string;
    };
    content: JSX.Element;
  }[];
}

export default function Tabs ({ tabs }: ITabsProps) {
  return (
    <ReactTabs className={styles.tabs}>
      <TabList className={styles['tabs-list']}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={styles['tabs-list-tab']}
            selectedClassName={styles['tabs-list-tab-selected']}
          >
            <Image
              src={tab.icon.src}
              alt={tab.icon.alt}
              width={20}
              height={20}
            />
            <h4>{tab.title}</h4>
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel key={index} className={styles['tabs-panel']}>{tab.content}</TabPanel>
      ))}
    </ReactTabs>
  )
}