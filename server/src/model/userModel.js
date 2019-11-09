import bcrypt from 'bcrypt-nodejs'

const user = [
    {
        id: 1,
        firstName: 'Ruhimbaza',
        lastName :  'Bertin',
        email    :  'ruhimbazab@gmail.com',
        phoneNumber : '078696092',
        userName    : 'bertin',
        password    : bcrypt.hashSync('bertin123'),
        userType    : 'user'
    },
    {
        id: 2,
        firstName: 'Ahishakiye',
        lastName :  'Aline',
        email    :  'aline@gmail.com',
        phoneNumber : '078696090',
        userName    : 'aline',
        password    : bcrypt.hashSync('aline123'),
        userType    : 'user'
    },
    {
        id: 3,
        firstName: 'Niyitegeka',
        lastName :  'Alphonsine',
        email    :  'alphonsine@yahoo.com',
        phoneNumber : '078176571',
        userName    : 'alphonsine',
        password    : bcrypt.hashSync('alphonsine123'),
        userType    : 'admin'
    },
    {
        id: 4,
        firstName: 'Ngarambe',
        lastName :  'Antoine',
        email    :  'antoine@gmail.com',
        phoneNumber : '078613090',
        userName    : 'antoine',
        password    : bcrypt.hashSync('antoine123'),
        userType    : 'admin'
    },
]

export default user;