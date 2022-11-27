import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import Icon from '../Layout/Icons/Icon';
import './TabViewSkills.css';


export default function TabViewSkills() {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='tabsMain'>
            <TabPanel className='inline tabPanel' header="Frontend">
                <Icon name="angular" title="Angular (8+)"/>
                <Icon name="react" title="ReactJs" />
                <Icon name="html" title="HTML" />
                <Icon name="css" title="CSS" />

            </TabPanel>
            <TabPanel className='inline tabPanel' header="Backend">
                <Icon name="java" title="Java"/>
                <Icon name="spring" title="Springboot"/>
                <Icon name="nodejs" title="Node Js"/>
                <Icon name="csharp" title=".NET"/>
            </TabPanel>
            <TabPanel className='inline tabPanel' header="Databases">
                <Icon name="mongo" title="MongoDB"/>
                <Icon name="mysql" title="My SQL"/>
                <Icon name="postgres" title="postgreSQL"/>
                <Icon name="sqlserver" title="MS SQL Server"/>
                <Icon name="oracle" title="PL-SQL"/>
            </TabPanel>
            <TabPanel className='inline' header="Tools">
                
            </TabPanel>
        </TabView>
    </div>
  )
}
