import docx, { convertInchesToTwip } from "docx";
 
const {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun,
    Header
  } = docx;

const fontType = 'Times New Roman'

// divided by 2 gives real font size
const bodyFontSize = 24;

// Redefine because of smaller margins
TabStopPosition.MAX = 12200;

const user = {
    firstName: 'Jake',
    lastName: 'Ottiger',
    phoneNumber: '1234567890',
    email: 'ottigerj@bc.edu',
    location: 'Chestnut Hill, MA',
    url: 'linkedin.com/jakeottiger'
}

const experiences = {
    pos1: {
        employer: "Boston College",
        title: "Lead Researcher, Prof. Thomas Wesner",
        location: "Newton, MA",
        startDate: "August 2022",
        endDate: "Present",
        description: ["Head research project that studies subjects in secondary roles (e.g., backup quarterbacks, company vice presidents, and play understudies) to understand preparation strategies and motivations while waiting for primary positions they may never attain",
        "Manage logistics including applications for funding and finding both interviewees and publishers", "Devise interview questions and conduct interviews of research subjects"]
    },
    pos2: {
        employer: "Boston College",
        title: "Legal Intern",
        location: "Newton, MA",
        startDate: "August 2022",
        endDate: "Present",
        description: [
            "Digest potential BCIP client trial transcripts into Excel, and recommend whether there is sufficient evidence for BCIP to pursue legal case",
            "Write intake memorandums on potential clients’ cases to concisely highlight key points of trial and/or appeal that may have caused wrongful conviction"
        ]
    },
    pos3: {
        employer: "Risk Averse Health Inc.",
        title: "Software Development Intern",
        location: "Boston, MA",
        startDate: "May 2022",
        endDate: "August 2022",
        description: [
            "Automated testing of preventative healthcare startup’s health assessments with React Testing Library and Jest programming libraries",
            "Converted website styling from CSS to Sass", "Participated in bi-weekly progress meetings concerning business and technological sides of the startup"
        ]
    },
    pos4: {
        employer: "Boston College",
        title: "Advanced Study Grant",
        location: "Boston, MA",
        startDate: "May 2022",
        endDate: "December 2023",
        description: ["Awarded $1452 in funding for independent skill acquisition project, only 1 of every 4 projects was funded",
    "Ideate project that tracks user credit card balances and optimally pays cards off given a payment amount", "Build Chrome extension with JavaScript utilizing Plaid’s API to securely access credit card account data"]
    },
    skills: {
        technical: ["Python", "Java", "JavaScript", "Microsoft Office Suite"]
    }
}

const firstName = 'Jake'
const lastName = 'Ottiger'
const phoneNumber = '1234567890'
const email = 'ottigerj@bc.edu'
const location = 'Chestnut Hill, MA'
const url = 'linkedin.com/jakeottiger'
const education = {
    school: 'Boston College', 
    secSchool: 'Wallace E. Carroll School of Management', 
    major: 'Computer Science and Finance',
    gradDate: 'May 2025', 
    gpa: '4.00', 
    location: location,
    degreeType: 'Bachelor of Science',
    honors: 'Gabelli Presidential Scholar'
}
const skills = {0: 'python', 1: 'java', 2: 'german'}

export class DocumentCreatorTest {
    create([profileInfo, education1, skills]) {
        const document = new Document({
            numbering: {
                config: [{
                    reference: "description-bullet",
                    levels: [
                        {
                            level: 0,
                            format: docx.LevelFormat.BULLET,
                            text: "\u2981",
                            alignment: docx.AlignmentType.LEFT,
                            style: {
                                paragraph: {
                                    indent: { left: docx.convertInchesToTwip(0.10), hanging: docx.convertInchesToTwip(0.12) }
                                }
                            }
                        }
                    ]
                }]
            },
            sections: [
                {
                properties: {
                    page: {
                        margin: {
                            top: convertInchesToTwip(0.4),
                            bottom: convertInchesToTwip(0.62),
                            left: convertInchesToTwip(0.5),
                            right: convertInchesToTwip(0.5),
                        },
                    },
                },
                children: [
                    ...this.createPersonal(user),
                    ...this.createEducation(education),
                    new Paragraph({spacing: {line: 100}}),
                    this.createSectionHeading('Work Experience'),
                    this.createWorkHeader(experiences.pos1.employer, experiences.pos1.location),
                    this.createWorkSubHeader(experiences.pos1.title, experiences.pos1.startDate, experiences.pos1.endDate),
                    ...this.createBullets(experiences.pos1.description),
                    new Paragraph({spacing: {line: 110}}),
                    this.createWorkHeader(experiences.pos2.employer, experiences.pos2.location),
                    this.createWorkSubHeader(experiences.pos2.title, experiences.pos2.startDate, experiences.pos2.endDate),
                    ...this.createBullets(experiences.pos2.description),
                    new Paragraph({spacing: {line: 110}}),
                    this.createWorkHeader(experiences.pos3.employer, experiences.pos3.location),
                    this.createWorkSubHeader(experiences.pos3.title, experiences.pos3.startDate, experiences.pos3.endDate),
                    ...this.createBullets(experiences.pos3.description),
                    new Paragraph({}),
                    this.createSectionHeading('Awards and Extracurriculars'),
                    this.createWorkHeader(experiences.pos4.employer, experiences.pos4.location),
                    this.createWorkSubHeader(experiences.pos4.title, experiences.pos4.startDate, experiences.pos4.endDate),
                    ...this.createBullets(experiences.pos4.description),
                    new Paragraph({}),
                    this.createSectionHeading('Skills'),
                    this.createSkills(experiences.skills.technical)

                ],
            }]
        });
    
        return document;
    }

    createPersonal(user) {
        return [this.createNameHeader(user.firstName, user.lastName), this.createContact(user.location, user.email, user.phoneNumber, user.url), new Paragraph({children: []})]
    }

    createEducation(education) {
        return [this.createSectionHeading('Education'), this.createEducationHeader(education.school, education.secSchool, education.location), this.createEducationSubHeader(education.degreeType, education.major, education.gpa, education.gradDate, education.minor), this.createEducationDesc(education.honors)]
    }

    createNameHeader(fn, ln) {
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: `${fn} ${ln}`,
                    size: 36,
                    font: {
                        name: fontType,
                    },
                    bold: true
                })
            ]
        })
    }

    formatPhoneNum(phone) {
        return '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) + '-' + phone.substring(6);
    }

    createContact(location, email, phone, url) {
        phone = this.formatPhoneNum(phone)
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                text: `${location} | ${email} | ${phone} | ${url}`,
                size: 26,
                font: {
                    name: fontType
                }
            })]
        });
    }

    createSectionHeading(sectionName) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: sectionName,
                    size: bodyFontSize,
                    font: {
                        name: fontType
                    },
                    allCaps: true,
                    bold: true
                })
            ],
            thematicBreak: true
          });
    }

    createEducationHeader(institutionName, secSchoolName, location) {
        return new Paragraph({
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX
              }
            ],
            children: [
              new TextRun({
                text: `${institutionName}, ${secSchoolName}`,
                bold: true,
                font: {
                    name: fontType
                },
                size: bodyFontSize
              }),
              new TextRun({
                text: `\t${location}`, // \t to use the tab stop
                bold: true,
                font: {
                    name: fontType
                },
                size: bodyFontSize
              })
            ],
            spacing: {line: 241} // add spacing to make sure letters don't get cut off
          });
    }

    createEducationSubHeader(degreeType, major, gpa, graduationDate, minor = null) {
        return new Paragraph({
            tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX
                }
              ],
              children: [
                new TextRun({
                    text: `${degreeType} in ${major}${minor ? ', Minor in ' + minor : ''} | GPA: ${gpa}/4.00`,
                    italics: true,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                }),
                new TextRun({
                    text: `\t${graduationDate}`,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize,
                })
              ],
              spacing: {
                before: 15
              }
        })
    }

    createEducationDesc(honors) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: `Honors & Awards: ${honors}`,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                })
            ],
            spacing: {before: 15}
        })
    }

    createWorkHeader(company, location) {
        return new Paragraph({
            tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX
                }
              ],
            children: [
                new TextRun({
                    text: `${company}`,
                    bold: true,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                }),
                new TextRun({
                    text: `\t${location}`,
                    bold: true,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                })
            ]
        })
    }

    createWorkSubHeader(position, startDate, endDate) {
        return new Paragraph({
            tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX
                }
              ],
            children: [
                new TextRun({
                    text: `${position}`,
                    italics: true,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                }),
                new TextRun({
                    text: `\t${startDate} - ${endDate}`,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                })
            ]
        })
    }

    createBullets(bulletArray) {
        const bullets = []
        bulletArray.forEach(val => {
            bullets.push(new Paragraph({
            numbering: {
                reference: "description-bullet",
                level: 0,
            },
            children: [
                new TextRun({
                    text: `${val}`,
                    font: {
                        name: fontType
                    },
                    size: 22,
                })
            ],
            spacing: {
                before: 15,
                line: 245
            }
            }))
        })
        return bullets
    }

    createSkills(skills) {
        const end = skills.pop();
        const text = skills.join(", ") + `, and ${end}`;
        return new Paragraph({
            children: [
                new TextRun({
                    text: "Technical: ",
                    bold: true,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                }),
                new TextRun({
                    text: text,
                    font: {
                        name: fontType
                    },
                    size: bodyFontSize
                })
            ]
        })
    }
}

