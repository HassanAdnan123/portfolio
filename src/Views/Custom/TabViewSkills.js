import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import Icon from '../Layout/Icons/Icon';
import './TabViewSkills.css';


export default function TabViewSkills() {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='tabsMain'>
            <TabPanel className='inline' header="Frontend">
                <Icon name="angular" title="Angular (8+)"/>
                <Icon name="react" title="ReactJs" />
                <Icon name="html" title="HTML" />

            </TabPanel>
            <TabPanel className='inline' header="Backend">
                
            </TabPanel>
            <TabPanel className='inline' header="Databases">
                <Icon name="mongo" title="MongoDB"/>
                <Icon name="mysql" title=""/>
            </TabPanel>
            <TabPanel className='inline' header="Tools">
                
            </TabPanel>
        </TabView>
    </div>
  )
}
