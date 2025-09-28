// artistsData.js - Featured Artists & Researchers Data
export const artistsData = [
    {
        id: 1,
        name: "Byungjun Kwon",
        country: "KR",
        portraitImage: "assets/artist/1.png",
        workImage: "assets/robot/1.png",
        workTitle: "Nael Performing the Fan Dance (2021)",
        profileLink: "https://byungjun.pe.kr/works/koreaartistprize",
        achievement: "Korea Artist Prize 2023 Winner",
        education:
            "BA French Literature, Seoul National University / MA Art Science, Royal Conservatory of The Hague",
        career: "Hardware Engineer at STEIM (Netherlands Electronic Music Research Institute)",
        specialty:
            "Research on sound-related hardware, developing new musical instruments and stage devices to create dramatic scenes that encompass music, theater, and visual arts through new media performance",
        socialLinks: [],
    },
    {
        id: 2,
        name: "Hyun Parke",
        country: "KR/US",
        portraitImage: "assets/artist/2.png",
        workImage: "assets/robot/2.png",
        workTitle: "3D Structural Pneumatic Inflation Study (2020)",
        profileLink:
            "https://www.hyunparke.com/works/3-dimensional-structural-pneumatic-inflation-study-2020",
        achievement: "Ars Electronica Museum Permanent Exhibition Artist",
        education: "BFA School of the Art Institute of Chicago, MS MIT",
        career: "Research Associate at Carnegie Mellon University (2024~)",
        specialty:
            "Interdisciplinary artist exploring pneumatic structures, inflatable objects, and dimensional display systems. Known for innovative work in air-reinforced structures and additive manufacturing technologies",
        socialLinks: [],
    },
    {
        id: 3,
        name: "Young Ah Seong",
        country: "JP",
        portraitImage: "assets/artist/3.png",
        workImage: "assets/robot/3.png",
        workTitle: "Puff Me Up! (2024)",
        profileLink: "https://www.affectivedesignlab.com/en",
        achievement: "ACM UIST/IEEE Robosoft Best Demonstration Award",
        education: "Ph.D in Interdisciplinary Informatics, University of Tokyo",
        career: "Associate Professor at Hosei University, Tokyo",
        specialty:
            "Director of Affective Design Lab, specializing in innovative technology and interaction design. Research focus on emotional interfaces and soft robotics for human-computer interaction",
        socialLinks: [
            {
                type: "youtube",
                url: "https://www.youtube.com/watch?v=Kpn0joo7luo",
                label: "Video →",
            },
        ],
    },
    {
        id: 4,
        name: "Yang Minha",
        country: "KR",
        portraitImage:
            "https://yt3.googleusercontent.com/ytc/AIdro_nPdHkG9aks_cIGSTSV_Ek06-AjYFTHVsf5Dw5-EA85xHs=s160-c-k-c0x00ffffff-no-rj",
        workImage: "assets/robot/4.png",
        workTitle: "A Repository of Reflection",
        profileLink: null,
        achievement: "Featured in Vogue, i-D Magazine, 1 Granary, Marie Claire",
        education: "Founder of Pisces Rising, New York",
        career: "Professor at University of Seoul Graduate School of Design",
        specialty:
            "NYC-based fashion designer who conjures a tactile dialogue between body, fabric, and space. Specializing in zero-gravity environment fashion design",
        socialLinks: [
            {
                type: "instagram",
                url: "https://www.instagram.com/reel/DE5j5g4Shn8/?utm_source=ig_web_copy_link",
                label: "Instagram →",
            },
        ],
    },
    {
        id: 5,
        name: "Dennis Hong",
        country: "US",
        portraitImage: "assets/artist/5.png",
        workImage: "assets/robot/5.png",
        workTitle: "BALLU: Buoyancy Assisted Lightweight Legged Unit",
        profileLink: "https://www.romela.org/dr-dennis-hong/",
        achievement: '"Brilliant 10" by Popular Science, TED Alumnus',
        education: "Ph.D in Mechanical Engineering, Purdue University",
        career: "Professor & Founding Director of RoMeLa at UCLA",
        specialty:
            'Director of RoMeLa (Robotics & Mechanisms Laboratory). Research focuses on robot locomotion and manipulation, autonomous vehicles and humanoid robots. Called "the Leonardo da Vinci of robots" by Washington Post',
        socialLinks: [],
    },
];

// 유틸리티 함수들
export const getArtistById = (id) => {
    return artistsData.find((artist) => artist.id === id);
};

export const getArtistsByCountry = (country) => {
    return artistsData.filter((artist) => artist.country.includes(country));
};

export const generateArtistCard = (artist) => {
    const socialLinksHtml = artist.socialLinks
        .map((link) => {
            const iconSvg = getSocialIcon(link.type);
            return `
            <a href="${link.url}" target="_blank" class="artist-link ${link.type}-link" title="${link.type}">
                ${iconSvg}
                <span>${link.label}</span>
            </a>
        `;
        })
        .join("");

    const profileLinkHtml = artist.profileLink
        ? `
        <a href="${
            artist.profileLink
        }" target="_blank" class="artist-link profile-link" title="View Profile">
            ${getProfileIcon()}
        </a>
    `
        : "";

    return `
        <div class="artist-card">
            <div class="artist-layout">
                <div class="artist-images">
                    <div class="artist-portrait">
                        <img src="${artist.portraitImage}" alt="${artist.name} Artist Photo" />
                    </div>
                    <div class="artist-work">
                        <img src="${artist.workImage}" alt="${artist.name} Artist Work" />
                        <div class="work-caption">
                            <span>${artist.workTitle}</span>
                        </div>
                    </div>
                </div>
                <div class="artist-info">
                    <div class="artist-header">
                        <h3 class="artist-name">
                            <span>${artist.name}</span>
                            <span class="artist-country">(${artist.country})</span>
                        </h3>
                        <div class="artist-links">
                            ${profileLinkHtml}
                            ${socialLinksHtml}
                        </div>
                    </div>
                    <div class="artist-bio">
                        <p class="artist-achievement">
                            ${artist.achievement}
                        </p>
                        <p class="artist-education">
                            ${artist.education}
                        </p>
                        <p class="artist-career">
                            ${artist.career}
                        </p>
                        <p class="artist-specialty">
                            ${artist.specialty}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// 소셜 아이콘 SVG 함수들
const getSocialIcon = (type) => {
    const icons = {
        youtube: `<svg class="social-icon" viewBox="0 0 512 512" fill="currentColor">
            <path d="M265,96c65.3,0,118.7,1.1,168.1,3.3l0.7,0h0.7c23.1,0,42,22,42,49.1v1.1l0.1,1.1c2.3,34,3.4,69.3,3.4,104.9v0v0    c0.1,35.6-1.1,70.9-3.4,104.9l-0.1,1.1v1.1c0,13.8-4.7,26.6-13.4,36.1c-7.8,8.6-18,13.4-28.6,13.4h-0.8l-0.8,0    c-52.9,2.5-108.8,3.8-166.4,3.8c-3.5,0-7.1,0-10.6,0H256h-0.1c-3.6,0-7.2,0-10.8,0c-57.8,0-113.7-1.3-166.2-3.7l-0.8,0h-0.8    c-10.6,0-20.7-4.8-28.5-13.4c-8.6-9.5-13.4-22.3-13.4-36.1v-1.1l-0.1-1.1c-2.4-34.1-3.5-69.4-3.3-104.7v-0.1v-0.1    c-0.1-35.3,1-70.5,3.3-104.6l0.1-1.1v-1.1c0-27.2,18.8-49.3,41.9-49.3H78l0.7,0c49.5-2.3,102.9-3.3,168.2-3.3h9H265 M265,64    c-3,0-6,0-9,0s-6,0-9,0c-57.6,0-114.2,0.8-169.6,3.3c-40.8,0-73.9,36.3-73.9,81.3C1,184.4-0.1,220,0,255.7    c-0.1,35.7,0.9,71.3,3.4,107c0,45,33.1,81.6,73.9,81.6c54.8,2.6,110.7,3.8,167.8,3.8c3.6,0,7.3,0,10.9,0c3.6,0,7.2,0,10.7,0    c57.1,0,113-1.2,167.9-3.8c40.9,0,74-36.6,74-81.6c2.4-35.7,3.5-71.4,3.4-107.1c0.1-35.7-1-71.3-3.4-107.1c0-45-33.1-81.1-74-81.1    C379.2,64.8,322.7,64,265,64L265,64z"/>
            <path d="M207,353.8V157.4l145,98.2L207,353.8z"/>
        </svg>`,
        instagram: `<svg class="social-icon" viewBox="0 0 56.7 56.7" fill="currentColor">
            <path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"/>
            <circle cx="41.5" cy="16.4" r="2.9"/>
            <path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"/>
        </svg>`,
    };
    return icons[type] || "";
};

const getProfileIcon = () => {
    return `<svg class="profile-icon" viewBox="0 0 24 24" fill="none">
        <path opacity="0.4" d="M12.1605 10.87C12.0605 10.86 11.9405 10.86 11.8305 10.87C9.45055 10.79 7.56055 8.84 7.56055 6.44C7.56055 3.99 9.54055 2 12.0005 2C14.4505 2 16.4405 3.99 16.4405 6.44C16.4305 8.84 14.5405 10.79 12.1605 10.87Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.1607 14.56C4.7407 16.18 4.7407 18.82 7.1607 20.43C9.9107 22.27 14.4207 22.27 17.1707 20.43C19.5907 18.81 19.5907 16.17 17.1707 14.56C14.4307 12.73 9.9207 12.73 7.1607 14.56Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
};
