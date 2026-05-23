import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Layout/Icons/Icon';
import { staggerContainer, iconItem } from '../animations';
import './TabViewSkills.css';

export default function TabViewSkills({ mode }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const IconGrid = ({ children }) => (
        <motion.div
            key={activeIndex}
            className={`icon-grid ${mode}-icon-text`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    );

    const AnimIcon = (props) => (
        <motion.div variants={iconItem}>
            <Icon {...props} />
        </motion.div>
    );

    return (
        <div className='tab-container'>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className={`${mode}-tabs tabsMain`}>
                <TabPanel header="Frontend">
                    <IconGrid>
                        <AnimIcon name="js" title="Javascript" />
                        <AnimIcon name="react" title="ReactJs" />
                        <AnimIcon name="angular" title="Angular (8+)" />
                        <AnimIcon name="ionic" title="Ionic" />
                        <AnimIcon name="html" title="HTML" />
                        <AnimIcon name="css" title="CSS" />
                    </IconGrid>
                </TabPanel>
                <TabPanel headerClassName="tabPanel" header="Backend">
                    <IconGrid>
                        <AnimIcon name="java" title="Java" />
                        <AnimIcon name="spring" title="Spring MVC" />
                        <AnimIcon name="springboot" title="Springboot" />
                        <AnimIcon name="nest" title="Nest" />
                        <AnimIcon name="python" title="Python / Django" />
                        <AnimIcon name="dotnet" title=".NET MVC" />
                    </IconGrid>
                </TabPanel>
                <TabPanel header="Databases">
                    <IconGrid>
                        <AnimIcon name="mongo" title="MongoDB" />
                        <AnimIcon name="mysql" title="My SQL" />
                        <AnimIcon name="postgres" title="postgreSQL" />
                        <AnimIcon name="sqlserver" title="MS SQL Server" />
                        <AnimIcon name="oracle" title="PL-SQL" />
                    </IconGrid>
                </TabPanel>
                <TabPanel header="Tools">
                    <IconGrid>
                        <AnimIcon name="vscode" title="VS Code" />
                        <AnimIcon name="intellij" title="IntelliJ Idea" />
                        <AnimIcon name="github" title="Github" />
                        <AnimIcon name="dbeaver" title="Dbeaver DB Client" />
                        <AnimIcon name="postman" title="Postman" />
                    </IconGrid>
                </TabPanel>
            </TabView>
        </div>
    )
}
