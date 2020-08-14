import React, {Component} from 'react';
import styles from '../components-styles/IconsSection.module.css';

class IconsSection extends Component {
    render() {
        return(
            <>
            <div className="container">
                <div className={`'row ' ${styles.quote}`}>
                    We Stand United
                </div>
                <div className={`'row ' ${styles.iconsContainer}`}>
                    <i className="fas fa-people-arrows"></i><i className={"fas fa-circle ".concat(`${styles.circle}`)}></i>
                    <i className="fas fa-house-user"></i><i className={"fas fa-circle ".concat(`${styles.circle}`)}></i>
                    <i className="fas fa-hands-wash"></i><i className={"fas fa-circle ".concat(`${styles.circle}`)}></i>
                    <i className="fas fa-head-side-mask"></i><i className={"fas fa-circle ".concat(`${styles.circle}`)}></i>
                    <i className="fas fa-head-side-cough-slash"></i><i className={"fas fa-circle ".concat(`${styles.circle}`)}></i>
                    <i className="fas fa-handshake-slash"></i>
                </div>
            </div>
            <div className={`${styles.footerContainer}`}> 
                <div className={`${styles.socialMedia}`}>
                    <a className={styles.icon} href="https://github.com/tushargoyal9990"><i class="fab fa-github"></i></a>
                    <a className={styles.icon} href="https://www.linkedin.com/in/tushar-goyal-445411184/"><i class="fab fa-linkedin"></i></a>
                    <a className={styles.icon} href="mailto:tushargoyal9990@gmail.com"><i class="fas fa-envelope"></i></a>
                </div>
                Created with <i className={"fas fa-heart ".concat(`${styles.heart}`)}></i> by Tushar Goyal
            </div>
            </>
        );
    }
}

export default IconsSection;