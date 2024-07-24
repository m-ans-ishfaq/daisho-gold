// 7 Bikes
export const BIKES_DATA = [
    {
        label: 'CD 70',
        img: 'cd-70.png'
    },
    {
        label: 'CD 100',
        img: 'cd-100.png'
    },
    {
        label: 'CG 125',
        img: 'cg-125.png'
    },
    {
        label: 'DLX 125',
        img: 'dlx-125.png'
    },
    {
        label: 'JH 70',
        img: 'jh-70.png'
    }
].map(b => ({ label: b.label, img: `bikes/${b.img}` }));