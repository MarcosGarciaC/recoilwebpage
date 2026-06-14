import CODM from './CODM_Home_Hero-BG_Desktop-LG-11.webp';
import RES from './games/Resident_Evil_Requiem_Art.jpg';
import CODN from './games/Call-of-Duty-–-Is-this-the-new-map-for-Warzone-2-1.jpg'
import FTN from './games/maxresdefault.jpg';
import H5  from './games/header (5).jpg'
import H6  from './games/header (6).jpg'
import forniteFoto from './games/ImagenJuegoFornite.jpg'
import MinecraftFoto from './games/ImagenJuegoMC.jpg'
import ApexFoto from './games/ImagenJuegoApex.jpg'
import SpidermanRemasteredFoto from './games/ImagenJuegoSpidermanRemastered.jpg'

export const header_games = [
  {
    game_name: "Call Of Duty: Warzone",
    game_description: "Forma un grupo con tus amigos y lucha en un tiroteo a gran escala para ser el último escuadrón en pie en la nueva versión del battle royale gratuito de Call of Duty. Lánzate, ármate hasta los dientes, saquea recompensas y lucha por llegar a lo más alto",
    game_img: CODM,
    game_link: "#",
    game_video: "https://www.youtube.com/watch?v=pQQ0Bd3QBTg"
  }
]

export const games = [
  {
    id: 1,
    title: "Valorant",
    genre: "FPS Táctico",
    developer: "Riot Games",
    release_year: 2020,
    rating: 4.5,
    price: "Free",
    platforms: ["PC"],
    image: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/valo2.png",
    description: "Shooter táctico 5v5 donde la precisión y las habilidades de agentes definen cada partida.",
    trailer: "https://youtu.be/IhhjcB2ZjIM?si=QV5MQTNJFXDFLukY"
  },
  {
    id: 2,
    title: "Counter-Strike 2",
    genre: "FPS Competitivo",
    developer: "Valve",
    release_year: 2023,
    rating: 4.6,
    price: "Free",
    platforms: ["PC"],
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/CS2_Cover_Art.jpg/250px-CS2_Cover_Art.jpg",
    description: "El clásico shooter competitivo evoluciona con nuevo motor y jugabilidad más precisa.",
    trailer: "https://youtu.be/c80dVYcL69E?si=OueykuZa_Nkx-Ipd"
  },
  {
    id: 3,
    title: "League of Legends",
    genre: "MOBA",
    developer: "Riot Games",
    release_year: 2009,
    rating: 4.4,
    price: "Free",
    platforms: ["PC"],
    image: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/leagueoflegends.png",
    description: "Juego estratégico por equipos donde cada campeón tiene habilidades únicas.",
    trailer: "https://youtu.be/-3aes7Vh8cc?si=ks6P8Ifx7V2jzK6m"
  },
  {
    id: 4,
    title: "Fortnite",
    genre: "Battle Royale",
    developer: "Epic Games",
    release_year: 2017,
    rating: 4.2,
    price: "Free",
    platforms: ["PC", "PS5", "Xbox", "Switch"],
    image: forniteFoto,
    description: "Battle royale con construcción, eventos en vivo y constantes actualizaciones.",
    trailer: "https://youtu.be/WJW-bzXZM8M?si=-i1ltXFSOprZvLAd"
  },
  {
    id: 5,
    title: "Call of Duty: Warzone",
    genre: "Battle Royale",
    developer: "Activision",
    release_year: 2020,
    rating: 4.3,
    price: "Free",
    platforms: ["PC", "PS5", "Xbox"],
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/COD_Warzone_Cover_Art.jpg/250px-COD_Warzone_Cover_Art.jpg",
    description: "Acción intensa en mapas masivos con mecánicas realistas y combate táctico.",
    trailer: "https://youtu.be/0E44DClsX5Q?si=fVDjzR_iW6-9Bmyc"
  },
  {
    id: 6,
    title: "Grand Theft Auto V",
    genre: "Acción / Mundo Abierto",
    developer: "Rockstar Games",
    release_year: 2013,
    rating: 4.8,
    price: "$29.99",
    platforms: ["PC", "PS5", "Xbox"],
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Grand_Theft_Auto_V.png/250px-Grand_Theft_Auto_V.png",
    description: "Explora Los Santos en una experiencia de mundo abierto llena de acción y misiones.",
    trailer: "https://youtu.be/hvoD7ehZPcM?si=tnnTLvvsT1aI-VTt"
  },
  {
    id: 7,
    title: "The Witcher 3",
    genre: "RPG",
    developer: "CD Projekt Red",
    release_year: 2015,
    rating: 4.9,
    price: "$39.99",
    platforms: ["PC", "PS5", "Xbox", "Switch"],
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/250px-Witcher_3_cover_art.jpg",
    description: "RPG de fantasía con historia profunda y un mundo abierto lleno de decisiones.",
    trailer: "https://youtu.be/1-l29HlKkXU?si=ci3mOSWXqgfqJlkr"
  },
  {
    id: 8,
    title: "Minecraft",
    genre: "Sandbox",
    developer: "Mojang",
    release_year: 2011,
    rating: 4.7,
    price: "$26.95",
    platforms: ["PC", "PS5", "Xbox", "Switch", "Mobile"],
    image: MinecraftFoto,
    description: "Construye, explora y sobrevive en un mundo infinito hecho de bloques.",
    trailer: "https://youtu.be/MmB9b5njVbA?si=khgvNKxvjDp58ZS5"
  },
  {
    id: 9,
    title: "Apex Legends",
    genre: "Battle Royale",
    developer: "Respawn Entertainment",
    release_year: 2019,
    rating: 4.3,
    price: "Free",
    platforms: ["PC", "PS5", "Xbox", "Switch"],
    image: ApexFoto,
    description: "Battle royale dinámico con héroes y habilidades únicas.",
    trailer: "https://youtu.be/UMJb_mkqynU?si=A5evq8Scmn27ieNO"
  },
  {
    id: 10,
    title: "Overwatch 2",
    genre: "Hero Shooter",
    developer: "Blizzard",
    release_year: 2022,
    rating: 4.1,
    price: "Free",
    platforms: ["PC", "PS5", "Xbox", "Switch"],
    image: "https://m.media-amazon.com/images/M/MV5BYjY0ZjJiMDQtNTY0Yy00ODJlLWEzYmYtMGZkZjNjNzc1NzE5XkEyXkFqcGc@._V1_.jpg",
    description: "Shooter por equipos basado en héroes con roles y habilidades cooperativas.",
    trailer: "https://youtu.be/GKXS_YA9s7E?si=cezEiQUrFIsl-m_B"
  }, 
  {
    id: 11,
    title: "The Last of Us Part I",
    genre: "Acción / Aventura",
    developer: "Naughty Dog",
    release_year: 2022,
    rating: 4.9,
    price: "$59.99",
    platforms: ["PC", "PS5"],
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/The_Last_of_Us_Part_I_cover.jpg/250px-The_Last_of_Us_Part_I_cover.jpg",
    description: "En un entorno posapocalíptico donde los infectados (humanos que se convierten en criaturas salvajes muy agresivas debido a un hongo mutado) deambulan por el mundo, Joel, un sobreviviente curtido, tiene la tarea de guiar a una adolescente llamada Ellie fuera de una zona de cuarentena militar. La misión se transforma en un viaje desgarrador a través de un Estados Unidos devastado, mientras Joel hace todo lo posible para mantener a Ellie con vida. ",
    trailer: "https://youtu.be/W01L70IGBgE?si=DTKqfobTwIUO9JgD"
  },
  {
    id: 12,
    title: "The Last of Us Part II",
    genre: "Acción / Aventura",
    developer: "Naughty Dog",
    release_year: 2020,
    rating: 4.7,
    price: "$49.99",
    platforms: ["PS4", "PS5"],
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/TLOU_P2_Box_Art_2.png/250px-TLOU_P2_Box_Art_2.png",
    description: "Secuela intensa con narrativa profunda y combate brutal.",
    trailer: "https://youtu.be/JdE9U9WW_HM?si=9YIoTK-AVgICm6xi"
  },
  {
    id: 13,
    title: "Red Dead Redemption",
    genre: "Acción / Mundo Abierto",
    developer: "Rockstar Games",
    release_year: 2010,
    rating: 4.8,
    price: "$39.99",
    platforms: ["PS4", "PS5", "Xbox", "Switch"],
    image: "https://cdn.mobygames.com/covers/24123973-red-dead-redemption-playstation-4-front-cover.jpg",
    description: "Aventura en el viejo oeste siguiendo la historia de John Marston.",
    trailer: "https://youtu.be/-o7rES_3ymA?si=8rDVMVxeRRxCCcW5"
  },
  {
    id: 14,
    title: "Red Dead Redemption 2",
    genre: "Acción / Mundo Abierto",
    developer: "Rockstar Games",
    release_year: 2018,
    rating: 4.9,
    price: "$59.99",
    platforms: ["PC", "PS5", "Xbox"],
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e5d6f175-3a2e-493d-b7f2-5f70852b4f2e/dermu4d-3d22a435-f639-4fc5-864d-0c78ac450eff.jpg/v1/fill/w_683,h_1171,q_70,strp/red_dead_redemption_2_game_cover_by_love_myart_dermu4d-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjE5NSIsInBhdGgiOiIvZi9lNWQ2ZjE3NS0zYTJlLTQ5M2QtYjdmMi01ZjcwODUyYjRmMmUvZGVybXU0ZC0zZDIyYTQzNS1mNjM5LTRmYzUtODY0ZC0wYzc4YWM0NTBlZmYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.IEFmIALxJhUthrr1pwdMdWUp-5Z-Hsc_XILLQcoBa8I",
    description: "Mundo abierto detallado ambientado en el salvaje oeste.",
    trailer: "https://youtu.be/MyaYlbizpvs?si=MAUlHnPu_vmhW640"
  },
  {
    id: 15,
    title: "God of War",
    genre: "Acción / Aventura",
    developer: "Santa Monica Studio",
    release_year: 2018,
    rating: 4.9,
    price: "$39.99",
    platforms: ["PC", "PS4", "PS5"],
    image: "https://savekeys.net/wp-content/uploads/2022/01/god-of-war-pc-game-steam-cover.jpg",
    description: "Kratos emprende una nueva aventura en la mitología nórdica.",
    trailer: "https://youtu.be/AN3jEjjcZ-k?si=FE_gmiAwdegI9Uw-"
  },
  {
    id: 16,
    title: "God of War Ragnarök",
    genre: "Acción / Aventura",
    developer: "Santa Monica Studio",
    release_year: 2022,
    rating: 4.9,
    price: "$69.99",
    platforms: ["PS5", "PS4"],
    image: "https://thumb.pccomponentes.com/w-530-530/articles/1047/10472219/6739-god-of-war-ragnarok-ps4-18f02c85-30f1-4eb0-9ba5-bdcca0894bbf.jpg",
    description: "Continúa la épica historia de Kratos y Atreus.",
    trailer: "https://youtu.be/hfJ4Km46A-0?si=NLE5lxdwR6jQK4mk"
  },
  {
    id: 17,
    title: "Cyberpunk 2077",
    genre: "RPG / Mundo Abierto",
    developer: "CD Projekt Red",
    release_year: 2020,
    rating: 4.2,
    price: "$49.99",
    platforms: ["PC", "PS5", "Xbox"],
    image: "https://4kwallpapers.com/images/wallpapers/cyberpunk-2077-768x1024-20154.jpg",
    description: "Explora Night City en un RPG futurista lleno de acción.",
    trailer: "https://youtu.be/qIcTM8WXFjk?si=PGpB7Z-JAI3Q4gJf"
  },
  {
    id: 18,
    title: "Elden Ring",
    genre: "RPG / Soulslike",
    developer: "FromSoftware",
    release_year: 2022,
    rating: 4.9,
    price: "$59.99",
    platforms: ["PC", "PS5", "Xbox"],
    image: "https://i.ebayimg.com/images/g/9owAAOSww4RiKBzU/s-l1200.jpg",
    description: "Aventura desafiante en un mundo abierto oscuro.",
    trailer: "https://youtu.be/E3Huy2cdih0?si=CQ_qvjWvxIPKkl7w"
  },
  {
    id: 19,
    title: "Horizon Zero Dawn",
    genre: "Acción / RPG",
    developer: "Guerrilla Games",
    release_year: 2017,
    rating: 4.6,
    price: "$39.99",
    platforms: ["PC", "PS4", "PS5"],
    image: "https://images.squarespace-cdn.com/content/v1/6438bb3e94582e0e6d7b5c60/1681444442057-BDSP3NSQ65OO9DIA27SJ/cfp1c3QENHakdjuf424Yt6hVn_mmFbOV-M8rITUoVj8_350x200_3x-0.jpeg",
    description: "Caza máquinas en un mundo postapocalíptico futurista.",
    trailer: "https://youtu.be/u4-FCsiF5x4?si=iJo1uMKTEtoQutM8"
  },
  {
    id: 20,
    title: "Spider-Man Remastered",
    genre: "Acción / Aventura",
    developer: "Insomniac Games",
    release_year: 2022,
    rating: 4.8,
    price: "$49.99",
    platforms: ["PC", "PS5"],
    image: SpidermanRemasteredFoto,
    description: "Balancea por Nueva York en una aventura de superhéroes.",
    trailer: "https://youtu.be/1E051WtpyWg?si=7olDkZdLwIlmxpA6"
  }
]


export const users = [
  {
    id: 1,
    username: "ShadowPlayer",
    premium: true,
    description: "Jugador competitivo amante de los FPS tácticos y juegos de historia profunda.",
    total_playtime_hours: 1240,
    achievements: 86,
    avg_score_given: 4.6,
    comments_made: 12,
    recent_reviews: [
      {
        game_id: 1,
        rating: 5,
        comment: "Valorant sigue siendo el mejor shooter táctico actualmente.",
        recommend: true,
        hours_played: 320
      },
      {
        game_id: 14,
        rating: 5,
        comment: "Red Dead Redemption 2 es una obra maestra.",
        recommend: true,
        hours_played: 180
      }
    ],
    recommendations: [14, 11, 7]
  },
  {
    id: 2,
    username: "PixelHunter",
    premium: false,
    description: "Explorador de mundos abiertos y RPGs con narrativa.",
    total_playtime_hours: 860,
    achievements: 54,
    avg_score_given: 4.2,
    comments_made: 8,
    recent_reviews: [
      {
        game_id: 18,
        rating: 5,
        comment: "Elden Ring es desafiante pero increíble.",
        recommend: true,
        hours_played: 140
      },
      {
        game_id: 17,
        rating: 4,
        comment: "Cyberpunk mejoró mucho con los parches.",
        recommend: true,
        hours_played: 95
      }
    ],
    recommendations: [18, 17, 19]
  },
  {
    id: 3,
    username: "CasualGamer",
    premium: false,
    description: "Jugador casual que disfruta multiplayer con amigos.",
    total_playtime_hours: 430,
    achievements: 21,
    avg_score_given: 3.9,
    comments_made: 5,
    recent_reviews: [
      {
        game_id: 4,
        rating: 4,
        comment: "Fortnite es divertido con amigos.",
        recommend: true,
        hours_played: 150
      },
      {
        game_id: 9,
        rating: 3,
        comment: "Apex es bueno pero difícil.",
        recommend: false,
        hours_played: 60
      }
    ],
    recommendations: [4, 1]
  },
  {
    id: 4,
    username: "StoryDriven",
    premium: true,
    description: "Fanático de juegos narrativos y cinematográficos.",
    total_playtime_hours: 980,
    achievements: 72,
    avg_score_given: 4.8,
    comments_made: 10,
    recent_reviews: [
      {
        game_id: 11,
        rating: 5,
        comment: "The Last of Us es emocionalmente perfecto.",
        recommend: true,
        hours_played: 40
      },
      {
        game_id: 12,
        rating: 5,
        comment: "Secuela increíble, muy intensa.",
        recommend: true,
        hours_played: 55
      }
    ],
    recommendations: [11, 12, 20]
  },
  {
    id: 5,
    username: "RetroLegend",
    premium: true,
    description: "Jugador veterano que disfruta clásicos y mundo abierto.",
    total_playtime_hours: 1500,
    achievements: 102,
    avg_score_given: 4.7,
    comments_made: 15,
    recent_reviews: [
      {
        game_id: 13,
        rating: 5,
        comment: "Red Dead Redemption sigue siendo increíble.",
        recommend: true,
        hours_played: 210
      },
      {
        game_id: 6,
        rating: 4,
        comment: "GTA V nunca envejece.",
        recommend: true,
        hours_played: 400
      }
    ],
    recommendations: [13, 6, 14]
  }
]

export const reviews = [
  { id: 1, user_id: 1, game_id: 1, rating: 5, comment: "Excelente shooter táctico.", recommend: true, hours_played: 320 },
  { id: 2, user_id: 2, game_id: 2, rating: 4, comment: "Muy competitivo y preciso.", recommend: true, hours_played: 210 },
  { id: 3, user_id: 3, game_id: 3, rating: 4, comment: "Gran juego estratégico.", recommend: true, hours_played: 500 },
  { id: 4, user_id: 3, game_id: 4, rating: 4, comment: "Divertido con amigos.", recommend: true, hours_played: 150 },
  { id: 5, user_id: 1, game_id: 5, rating: 4, comment: "Buen battle royale.", recommend: true, hours_played: 120 },
  { id: 6, user_id: 5, game_id: 6, rating: 5, comment: "Clásico de mundo abierto.", recommend: true, hours_played: 400 },
  { id: 7, user_id: 2, game_id: 7, rating: 5, comment: "Historia increíble.", recommend: true, hours_played: 160 },
  { id: 8, user_id: 3, game_id: 8, rating: 5, comment: "Creatividad infinita.", recommend: true, hours_played: 600 },
  { id: 9, user_id: 3, game_id: 9, rating: 3, comment: "Difícil pero bueno.", recommend: false, hours_played: 60 },
  { id: 10, user_id: 1, game_id: 10, rating: 4, comment: "Buen hero shooter.", recommend: true, hours_played: 90 },

  { id: 11, user_id: 4, game_id: 11, rating: 5, comment: "Historia emocional.", recommend: true, hours_played: 40 },
  { id: 12, user_id: 4, game_id: 12, rating: 5, comment: "Secuela intensa.", recommend: true, hours_played: 55 },
  { id: 13, user_id: 5, game_id: 13, rating: 5, comment: "Excelente western.", recommend: true, hours_played: 210 },
  { id: 14, user_id: 1, game_id: 14, rating: 5, comment: "Obra maestra.", recommend: true, hours_played: 180 },
  { id: 15, user_id: 2, game_id: 15, rating: 5, comment: "Kratos renovado.", recommend: true, hours_played: 70 },
  { id: 16, user_id: 2, game_id: 16, rating: 5, comment: "Épico de principio a fin.", recommend: true, hours_played: 65 },
  { id: 17, user_id: 2, game_id: 17, rating: 4, comment: "Gran ambientación.", recommend: true, hours_played: 95 },
  { id: 18, user_id: 2, game_id: 18, rating: 5, comment: "Desafiante y enorme.", recommend: true, hours_played: 140 },
  { id: 19, user_id: 2, game_id: 19, rating: 4, comment: "Muy buen mundo.", recommend: true, hours_played: 80 },
  { id: 20, user_id: 4, game_id: 20, rating: 5, comment: "Spider-Man perfecto.", recommend: true, hours_played: 45 }
]


export const news = [
 {
  news_title : "Nueva entrega: Resident Evil Series",
  published_date: "24.05.26",
  description: "La próxima evolución del motor de física virtual llega este verano. Experimenta un movimiento fluido sin precedentes, entornos destructibles y una interfaz táctica redefinida.",
  background_image: RES, 
  highlight: 1,
},
{
  news_title : "MEJORAS EN CALIBRACION DE CONEXIONES NEURONALES",
  published_date: "24.05.26",
  description: "Optimized input latency by 14ms across all peripheral types in the latest patch.",
  background_image: RES, 
  highlight: 0,
  category: 'UPDATES',
},
{
  news_title : " PACK DE EXPANSION: WARZONE",
  published_date: "24.05.26",
  description: "New maps, 4 exclusive character classes, and the highly anticipated Zero-G game mode.",
  background_image: CODN, 
  highlight: 0,
  category: 'Patch_notes',
},
{
  news_title : "FORTNITE WORLD FINALS",
  published_date: "24.05.26",
  description: "Watch the top 16 squads compete for the $2.5M prize pool starting this Friday.",
  background_image: FTN, 
  highlight: 0,
  category: 'Community',
},
{
  news_title : "EL MATCH PERFECTO EN AJEDREZ",
  published_date: "24.05.26",
  description: "A deep dive into the procedural destruction algorithms powering our new physics engine.",
  background_image: H5, 
  highlight: 0,
  category: 'Dev_Blog',
},
{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},{
  news_title : "NUEVOS JUEGOS DE VERANO",
  published_date: "24.05.26",
  description: "Limited edition technical wear and hardware accessories available for pre-order next month.",
  background_image: H6, 
  highlight: 0,
  category: 'UPDATES',
},
]