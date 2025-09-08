// robotFashionData.js
export const robotFashionShowData = {
    title: "Call for Participation",
    subtitle: "Robot Fashion Show",
    conference: "Humanoids'25",

    description: {
        main: "The organizers of Humanoids'25 are excited to invite the submission of proposals for the first Robot Fashion Show. As the field of robotics makes steep progress, it is anticipated that robots will be roaming around human environments, performing various tasks for and with humans.",
        purpose:
            'In this context, this track invites artists, designers, and researchers to propose creative ideas for "dressing up" the robots for safety, aesthetic comfort, and creative expression.',
    },

    importantDates: [
        {
            event: "Proposal Deadline",
            date: "July 31, 2025",
            time: "11:59:59 AoE",
            note: "Anywhere on Earth",
        },
        {
            event: "Decision",
            date: "August 15, 2025",
        },
        {
            event: "Actual competition (Robot Fashion Show Track)",
            date: "October 1, 2025",
        },
        {
            event: "Robot Fashion Show",
            date: "October 2, 2025",
            location: "Seoul Impact Arena",
            note: "Selected teams from the peer-reviewed competition track will be invited to participate in the Robot Fashion Show with the invited artists. Transportation from and to COEX will be provided.",
        },
    ],

    researchAreas: [
        {
            title: "Robot design",
            description:
                "Designing the appearance of a robot is a complex design task that involves various requirements and constraints in addition to aesthetic quality. We invite artists and designers to propose creative designs of next generation robots.",
        },
        {
            title: "Fashion for robots",
            description:
                "In the growing field of arts in robotics, fashion designers are invited to collaborate with roboticists to pioneer this new field of robot fashion.",
        },
        {
            title: "Wearable sensors for robots",
            description:
                "Wearable sensor units or suits can enable full-body sensing for robots of various morphologies including humanoids. We invite creative roboticists to propose wearable sensors and wearable robots for robots and/or humans.",
        },
        {
            title: "Safe human-robot interaction",
            description:
                "Wearable safety gear like an airbag can be designed for both humans and robots who work in close proximity. Such a safety gear could be a wearable robot itself. We invite robotics researchers in soft robots and HRI to bring novel ideas to promote safe physical human-robot interaction.",
        },
        {
            title: "Fabric manipulation",
            description:
                "Fashion involves various types of deformable material including fabrics and strings. Dressing and undressing for itself are highly challenging deformable object manipulation tasks. We invite Robot Learning researchers to showcase fabric manipulation beyond folding towels.",
        },
        {
            title: "Model walk",
            description:
                "Can a biped robot walk and turn like a model? Can robots move elegantly while performing motions? We invite roboticists to propose novel algorithms to enable robots to move and walk elegantly like a dancer or model.",
        },
    ],

    participationTracks: [
        {
            title: "Robot Fashion (Art/Design)",
            description:
                "The main track invites artists, designers, and researchers to demonstrate artistic and/or technical innovations in robot fashion.",
            details:
                "We welcome both working prototypes and conceptual mockups to visualize the future of robot design that is aware of safety as well as aesthetics.",
        },
        {
            title: "Robot Model (Robots)",
            description:
                "This track invites unique robots from both research and industry to participate in the show as models.",
            requirement:
                "To be selected, the proposal must include strong evidence for the robot's stable and robust mobility.",
        },
    ],

    submission: {
        platform: {
            name: "OpenReview",
            url: "https://openreview.net/group?id=IEEE.org/RAS/Humanoids/2025/Robot_Fashion_Show#tab-recent-activity",
        },
        template: {
            name: "Proposal Template",
            url: "https://docs.google.com/document/d/1yIVuXXMjTU1bu9GG0YxUwiTWMtbW9YxGKOldtGVVsRM/edit?usp=sharing",
        },
        format: [
            {
                item: "Description",
                details:
                    "2-page limit, not including proposer bios and references. The authors are expected to address the points in the proposal.",
            },
            {
                item: "Video",
                details:
                    "Less than 3 minutes showing their concept, and the hardware they will bring to the conference venue in Seoul, Korea.",
            },
        ],
    },

    requirements: [
        "Each proposed idea is required to include at least 1 physical robot system(s) (rather than simulation or other digital formats only).",
        "It is allowed to submit work that was presented elsewhere; however, preference will be given to novel contributions that have not been previously shown at another conference or other events.",
        "By submitting a proposal, the proposers are required to peer-review at least one other submission in this track.",
    ],

    setup: {
        description:
            "The Robot Fashion Show will share the Competition setting",
        dimensions: "15m x 2.5m Runway",
        documentUrl:
            "https://2025humanoids.org/wp-content/uploads/2025/04/H25_Competition_Categories.pdf",
    },

    importantNotes: [
        "Please note that you are responsible for transporting the hardware and preparing all the required documentation (e.g., customs forms and insurance, if needed). Humanoids 2025 Organizing Committee is not liable for any damages that may occur during transport or during demonstrations, and does not offer any insurance or shipping arrangements.",
        "If your proposal is accepted, at least one author must register for and attend the session to present the work in person.",
    ],

    contact: {
        name: "Jean Oh",
        email: "jeanoh@cmu.edu",
        subjectPrefix: "[RoboFashion25]",
    },
};

// 사용 예시
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
};

export const getUpcomingDeadline = () => {
    const now = new Date();
    return robotFashionShowData.importantDates.find(
        (date) => new Date(date.date) > now
    );
};
