// File: src/components/Team/OurTeam.jsx

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { teamData } from '../../assets/data/teamData'; // Import our new data file
import './our-team.css'; // We will create this CSS file next

const OurTeam = () => {
  return (
    <section className="team-section">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate explorers and dedicated experts behind your adventures.
            </p>
          </Col>
        </Row>

        <Row>
          {teamData.map((member) => (
            <Col lg="4" md="6" sm="12" className="mb-4" key={member.id}>
              <div className="team-card">
                <div className="team-image">
                  <img src={member.imgUrl} alt={member.name} />
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                  <div className="team-socials">
                    {member.socials.map((social, index) => (
                      <a 
                        href={social.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={index}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default OurTeam;