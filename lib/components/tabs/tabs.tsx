import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';

import './tabs.scss';

interface ITabsProps {
  tabs: {
    title: string;
    content: JSX.Element;
  }[];
}

export default function Tabs ({ tabs }: ITabsProps) {
  return (
    <ReactTabs className='tabs'>
      <TabList className='tabs-list'>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className='tabs-list-tab'
            selectedClassName='tabs-list-tab-selected'
          >
            <h4>{tab.title}</h4>
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel key={index} className='tabs-panel'>{tab.content}</TabPanel>
      ))}
    </ReactTabs>
  )
}