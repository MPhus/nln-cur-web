import { maxForQuantityAndType } from '~/untils/format'
export const mockData = {
	homePage: {
		_id: 'home-page',
		thumbShirt: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720702797/316940281_458793726367701_2108490475932759507_n_ca2j1n.jpg',
		thumbPant: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720702797/301693442_5406775299416357_2643294596215212952_n_ovueay.jpg',
		// slide: {
		// 	title: 'RESTOCK ALERT',
		// 	heading: 'BEST SELLERS ITEMS',
		// 	content: 'UP TO 15% OFF',
		// 	description: 'The return of the most sought-after items.',
		// 	thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720702953/323165685_608106891081119_7820470230397909435_n_qf7xu8.jpg'
		// },
		slide: {
			title: '138/8 𝑻𝒓𝒂̂̀𝒏 𝑯𝒖̛𝒏𝒈 Đ𝒂̣𝒐',
			heading: 'Trong con hẻm này có một tiệm đồ si dành riêng cho mấy gã Đàn Ông',
			content: 'Tụi tui vẫn luôn ở đây, cùng với tất cả những gì chỉn chu nhất có thể, để luôn sẵn sàng trở thành một phần đồng hành cùng hành trình của những gã Đàn Ông đạo mạo',
			description: '- 𝑇𝑖𝑒̣̂𝑚 𝐶𝑢̉ -',
			thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721112020/422409474_694375446142860_7560533461656277863_n_qdeo92.jpg'
		},
		intro: {
			title: '𝑂̛̉ 𝑐𝑎́𝑖 𝑇𝑖𝑒̣̂𝑚 𝐶𝑢̉, 𝑐𝑜́ 𝑛ℎ𝑢̛̃𝑛𝑔 𝑚𝑜́𝑛 𝑐𝑢̃',
			content: 'Có những món đã cũ trước khi gặp Củ, tụi nó theo Củ một thời gian dài giờ thì đã cũ hơn Nhưng với tất cả tình cảm dành cho những món đồ có giá trị theo thời gian, thì tụi nó vẫn luôn được trân quý Đó cũng là lý do mà hơn 4 năm về trước tụi mình đã chọn khởi nghiệp bằng những gì đã cũ',
			thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720708214/slideDone_c8vkzs.png'
		},
		about: {
			title: 'Chào những Củ\'er',
			content: 'Tụi mình đã cùng nhau đi chung một đoạn đường dài gần 7 năm rồi đấy!\nĐã có rất nhiều sự thay đổi từ vị trí, concept đến nhân sự. Nhưng có một điều tụi mình chưa bao giờ thay đổi đó là niềm tin yêu vào mảng “thời trang sử dụng lại”!\nTụi mình luôn tin rằng, giá trị thời gian cũng như giá trị bảo vệ tài nguyên thiên nhiên rất đáng được bảo tồn và phát huy!\nSau đại dịch thị biến động của thị trường và khủng hoảng kinh tế đã ảnh hưởng đến giá thành của các sản phẩm may mặc cũng như các sản phẩm “sử dụng lại” rất nhiều!\nNhưng sau khi suy nghĩ thật kỹ thì tụi mình đã chấp nhận có những điều chỉnh tích cực về giá thành các sản phẩm trong cửa hàng để cùng mọi người vượt qua giai đoạn kinh tế khó khăn này và cũng như để mọi người đừng lãng quên đi những món đồ “sử dụng lại”!\nCảm ơn mọi người đã luôn đồng hành và gắn bó với tụi mình, và giờ đây là sự điều chỉnh giá như một món quà mà tụi Củ gửi đến tất cả các bạn, hãy cùng tụi mình “sử dụng lại” những món đồ xứng đáng được tái sinh nhé ',
			thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720750456/about_dqdwwa.jpg'
		},
	},
	otherPage: {
		_id: 'about-page',
		slide: {
			title: 'Thị trấn bình thường',
			content: 'Trong Thị Trấn có một quầy nước bình thường, tiệm đồ si bình dị, Cái Túi và Con Gấu si bình lặng, khu vườn nhỏ bình yên … và mang đến những điều hạnh phúc bình thường\nMột ngày đẹp trời nào đó, nếu bạn muốn tìm đến những “điều bình thường rất thật” thì hãy Lạc đến tụi mình, Lạc đến Thị Trấn Bình Thường',
			description: '-Củ đi Lạc-',
			thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721113088/351311852_811057347254034_1716949600595932988_n_br40az.jpg'
		},
		newListOderIds: ['news-list-03', 'news-list-04', 'news-list-02', 'news-list-05', 'news-list-01'],
		newsList: [
			{
				_id: 'news-list-01',
				title: 'Hôm nay những đám mây như sà xuống chơi… ',
				content: 'Mấy nay cứ chiều là bầu trời âm u, những cơn mưa dầm làm tụi mình khó gặp nhau hơn!\nNhưng mà đây cũng là điều kiện để tụi mình chăm sóc lại khu vườn nhỏ trong Thị Trấn Bình Thường này…\nĐể rồi một ngày nắng đẹp, tụi mình sẽ chỉn chu và xinh xắn hơn để gặp lại mọi người',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721117919/slideCudiLac_pefkak.png',
				isDark: false,
				isCenter: false
			},
			{
				_id: 'news-list-02',
				title: 'Thong dong đêm số 8',
				content: 'Tụi mình quyết định vẫn thực hiện đêm nhạc và các bạn vẫn quyết định ngồi thong dong nghe tụi mình hát, nghe tụi mình hàn thuyên về những thanh âm cho một cuộc sống đầy tích cực\nMột sân khấu dựng tạm, một chiếc lều nhỏ, những chiếc ô cầm tay … và những tâm hồn hướng đến những điều tích cực đã làm nên một đêm nhạc chữa lành cho tất cả\nCảm ơn tất cả các Cậu. ',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721184766/428704794_775794591409278_2300054024883733401_n_zrprp9.jpg',
				isDark: false,
				isCenter: false
			},
			{
				_id: 'news-list-03',
				title: 'Đúng thời gian này 1 năm về trước, tụi mình bắt tay vào xây dựng Củ đi Lạc',
				content: 'Có một sự thật về ý tưởng ban đầu của tụi mình không phải là mô hình quán cafe\nNhưng vì một điều kì diệu nào đó, “Cà Phê Củ đi Lạc” của tụi mình đã ở đây suốt 1 năm vừa qua\nĐiều kỳ diệu nào đó ư ??? , tụi mình biết chắc chắn đó chính là những tình cảm, những sự ủng hộ mỗi ngày của tất cả các bạn đã dành cho\nBiết mình còn nhiều thiếu sót, nhưng thời gian tới tụi mình sẽ thật sự chuyển mình về cả chất lượng các món uống cho đến không gian thưởng thức để đáp lại những tình cảm chân thành của các bạn\nVẫn là Củ đi Lạc, bạn quán nước không gian mở hoàn toàn với các món nước truyền thống nhưng ở “nấc thang” cao hơn, một lần nữa Củ đi Lạc cảm ơn và luôn hẹn gặp lại.',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721187290/coffee_johdoz.png',
				isDark: false,
				isCenter: true
			},
			{
				_id: 'news-list-04',
				title: 'Nhóm Trà Tươi Giải Nhiệt của tụi mình nè',
				content: 'Dành cho những bạn không uống được cafe hoặc đang muốn một ngày thật ngọt - mát\nCác bạn có thể gọi Siro Hoa Bụp Giấm, Trà Cam Sả (hỏng có đào) hoặc đơn giản là Trà Chanh Đường\nVì là dòng thức uống từ trái cây tươi nên đôi lúc sẽ có sự “nhỉnh” hơn về hương vị, có gì mấy bạn cứ yêu cầu điều chỉnh cho hợp khẩu vị nhé.',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721186019/tropical_rheaee.png',
				isDark: true,
				isCenter: false
			},
			{
				_id: 'news-list-05',
				title: 'Một buổi sáng cùng những nỗi buồn thật đẹp…',
				content: 'Lâu lắm rồi mới có một buổi sáng chỉ mỗi tụi mình và 1 bạn khách quen duy nhất, cũng vắng, cũng lặng nhưng tự nhiên những khoảng lặng như vầy cũng giúp tụi mình yêu thêm nơi này!\nMột khoảng lặng cần thiết để chăm sóc, để ngắm nhìn những gì mà tụi mình đã và đang theo đuổi\nCảm ơn đã đi Lạc đến Thị trấn Bình Thường.',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721189075/dark_e2szpy.png',
				isDark: true,
				isCenter: true
			},
		],
	},
	storePage: {
		topSlide: {
			title: '',
			heading: '',
			content: '',
			description: '',
			thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721269696/shirtSlide_v7zna9.jpg'
		},
		bottomSlide: {
			title: '',
			content: '',
			description: '',
			thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721269694/pantSlide_slnura.jpg'
		},
		products: [
			{
				_id: 'product_01',
				brand: 'wrangler',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720758661/khaki_o_goqqb2.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 2,
				type: 'top',
				color: 'orange',
				fabric: 'khaki',
				size: 'L',
				sold: 1 //true-false
				// isRare
			},
			{
				_id: 'product_02',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720758662/khaki_y_ugidku.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 40,
				quantity: 2,
				type: 'top',
				color: 'camo',
				fabric: 'khaki',
				size: 'M',
				sold: 1
			},
			{
				_id: 'product_03',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720758662/khaki_pink_aozjml.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'pink',
				fabric: 'khaki',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_04',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720758661/khaki_blue_gwm1vb.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'khaki',
				size: 'S',
				sold: 1
			},
			{
				_id: 'product_05',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720762798/294757488_5296362010457687_1139796798119014841_n_xooyaf.jpg',
				description: 'Dài x Eo: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'yellow',
				fabric: 'jogger',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_6',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720762799/294771353_5296362290457659_917166969787422662_n_giojt5.jpg',
				description: 'Dài x Eo: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'camo',
				fabric: 'jogger',
				size: 'XL',
				sold: 25
			},
			{
				_id: 'product_7',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720762799/294775739_5296362133791008_4782380351381171519_n_nijkyw.jpg',
				description: 'Dài x Eo: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'black',
				fabric: 'jogger',
				size: 'M',
				sold: 10
			},
			{
				_id: 'product_12',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1720762800/294819816_5296361847124370_7921932272008092541_n_kjzfww.jpg',
				description: 'Dài: 70cm\nLưng: 50cm\nỐng: 10cm',
				price: 150,
				savePercent: 15,
				quantity: 1,
				type: 'bottom',
				color: 'green',
				fabric: 'jogger',
				size: 'L',
				sold: 15
			},
			{
				_id: 'product_13',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360930/448507676_775490404698030_2310452493809593702_n_lahpah.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'brown',
				fabric: 'coduroy',
				size: 'L',
				sold: 15
			},
			{
				_id: 'product_14',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360942/450573872_788094326770971_1418039984575407876_n_uycdp0.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'other',
				fabric: 'sweater',
				size: 'L',
				sold: 15
			},
			{
				_id: 'product_15',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360940/450332296_788094320104305_6711727992369133841_n_imbncc.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 100,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'brown',
				fabric: 'sweater',
				size: 'XL',
				sold: 15
			},
			{
				_id: 'product_16',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360940/450370421_788094253437645_5056194680270388938_n_sqoeet.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'other',
				fabric: 'sweater',
				size: 'L',
				sold: 9
			},
			{
				_id: 'product_23',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360939/450313102_788094290104308_6986514765100280741_n_fmbgh9.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 90,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'yellow',
				fabric: 'sweater',
				size: 'M',
				sold: 0
			},
			{
				_id: 'product_17',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360935/448607053_775490338031370_4205425606752860421_n_smfmd9.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'black',
				fabric: 'coduroy',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_18',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360933/448546379_775490431364694_3431230141576333606_n_louv9g.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 100,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'orange',
				fabric: 'coduroy',
				size: 'L',
				sold: 2
			},
			{
				_id: 'product_19',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360932/448510829_775490414698029_5722733362525484586_n_wrcbpn.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 100,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'yellow',
				fabric: 'coduroy',
				size: 'L',
				sold: 2
			},
			{
				_id: 'product_20',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360932/448541097_775490398031364_4719808865345963474_n_iz5bq1.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'pink',
				fabric: 'coduroy',
				size: 'L',
				sold: 2
			},
			{
				_id: 'product_21',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360931/448508706_775490371364700_3611599009534624957_n_kk45cs.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'green',
				fabric: 'coduroy',
				size: 'L',
				sold: 10
			},
			{
				_id: 'product_22',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360929/444489193_763443849236019_3969588330629751391_n_plxamc.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'white',
				fabric: 'hawai',
				size: 'M',
				sold: 0
			},
			{
				_id: 'product_24',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360928/444485850_760629759517428_7651025227859696859_n_t7oxsp.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'khaki',
				size: 'L',
				sold: 0
			},
			{
				_id: 'product_25',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360927/444484587_763443839236020_5613712820954177733_n_przo8u.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 100,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'black',
				fabric: 'hawai',
				size: 'L',
				sold: 10
			},
			{
				_id: 'product_26',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360927/444480748_763443812569356_5210255538910746341_n_tglnlq.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'hawai',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_27',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360924/444479517_760629792850758_3902514129542786540_n_jpooit.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 100,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'hawai',
				size: 'XL',
				sold: 1
			},
			{
				_id: 'product_28',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360923/442499924_763443865902684_7603852328785562635_n_rfdogg.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 100,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'brown',
				fabric: 'hawai',
				size: 'XL',
				sold: 1
			},
			{
				_id: 'product_29',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360922/441624484_760629886184082_1802166324673701519_n_owxhum.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'jean',
				size: 'S',
				sold: 1
			},
			{
				_id: 'product_30',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360923/441966153_760629749517429_5304951973831517066_n_bawpxn.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 200,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_31',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360921/432778884_720885023491902_1195897335415160396_n_y46m2y.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 220,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_32',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360920/432759367_720885076825230_1032209463671444684_n_ryccnq.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 350,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'black',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_33',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360919/431854994_720885036825234_1336507069980909826_n_pgfjhv.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 220,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'white',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_34',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360918/430905246_713965180850553_64990043471216660_n_dkqmwi.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'white',
				fabric: 'kate',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_35',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360914/429677789_711563644424040_6506160894615111107_n_npp3dd.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'white',
				fabric: 'linnen',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_36',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360911/338901250_1610910126022433_3274932801373356152_n_txpdsw.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'blue',
				fabric: 'linnen',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_37',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360910/335165791_518917503777299_8720355440219631348_n_zzr0zt.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 120,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'black',
				fabric: 'kate',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_38',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360911/338513299_195556016534261_3250367061826028459_n_qnhe1b.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'top',
				color: 'orange',
				fabric: 'coduroy',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_39',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360332/251790550_4512565022170727_8009304253705935505_n_vfnsr7.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_40',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360872/p6_b2txcb.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_41',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360871/p5_nfdaib.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_42',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360870/p4_wzbfy4.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_43',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360869/p3_mf3jp6.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_44',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360867/p1_fevtkl.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_45',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360867/p2_vhi21s.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_46',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360866/339851636_541499764763433_4042531113617231195_n_du89lm.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'black',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_47',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360866/339748512_939643094140260_5894238272960859146_n_a2qoof.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'camo',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_48',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360865/339412622_614994790490036_404797062377030925_n_xhvvzl.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'white',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_49',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360864/338384624_757110315769203_7924345593801076151_n_kvaqtq.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'green',
				fabric: 'khaki',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_50',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360859/338016469_971868367325338_156699791071895059_n_bgfug7.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'black',
				fabric: 'khaki',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_51',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360859/337992267_734125861696990_6042720143640914523_n_titode.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'white',
				fabric: 'khaki',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_52',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360858/337876785_608490234458526_2725800062770886246_n_o54gbr.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'brown',
				fabric: 'khaki',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_53',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360858/337807158_933242891253411_4718320945064426999_n_uftps7.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'green',
				fabric: 'khaki',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_54',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360858/337656013_524004566557686_7217077333439762030_n_cb7bun.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'black',
				fabric: 'khaki',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_55',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360337/248359708_4512565315504031_9128074119918286909_n_lrxzut.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 250,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_56',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360332/251790550_4512565022170727_8009304253705935505_n_vfnsr7.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 250,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_57',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360332/248368180_4512564195504143_4444074327036548068_n_uoc8bg.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 220,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_58',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360332/251979648_4512564002170829_8406913454698441139_n_e2wnjw.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'blue',
				fabric: 'jean',
				size: 'L',
				sold: 1
			},
			{
				_id: 'product_59',
				brand: 'other',
				thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721360331/265388228_4620869174673644_3167738944573662484_n_j48eiy.jpg',
				description: 'Dài x Rộng: 70x50 cm',
				price: 150,
				savePercent: 0,
				quantity: 1,
				type: 'bottom',
				color: 'yellow',
				fabric: 'short',
				size: 'L',
				sold: 0
			}
		]
	}
}


export const getProduct = (type, page, quantity) => {
	const productType = type !== 'all' ? mockData.storePage.products.filter(item => item.type === type) : [...mockData.storePage.products]
	const maxProductOfPage = !quantity ? 12 : quantity
	const totalProduct = productType.length
	const totalPage = Math.ceil(totalProduct / maxProductOfPage)
	const resuil = []
	for (let i = 0; i < totalPage; i++) {
		resuil.push(
			{
				maxProductOfPage,
				totalPage,
				data: [],
				totalProduct,
				page: i + 1
			}
		)

		for (let f = 0; f < maxProductOfPage; f++) {
			const test = productType.shift()
			if (test) {
				resuil[i].data.push(test)
			}
		}

	}
	return resuil[page - 1]
}

export const getProductForType = (type) => {
	return mockData.storePage.products.filter(item => item.type === type)
}
export const getHomePage = () => {
	return mockData.homePage
}
export const getStorePage = () => {
	const slide = {
		bottom: mockData.storePage.bottomSlide.thumb,
		top: mockData.storePage.topSlide.thumb,
	}
	return slide
}
export const getOtherPage = () => {
	return mockData.otherPage
}
export const getProductById = (id) => {
	return mockData.storePage.products.find(item => item._id === id)
}
export const getThumbProductForType = (type) => {
	return mockData.storePage[`${type}Slide`]
}
export const getBestSeller = (type, number, feild) => {
	return maxForQuantityAndType(mockData.storePage.products.filter(item => item.type === type), number, feild)
}

export const test = [
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
	{
		code: 'HD3009',
		time: '14.06',
		quantity: 15,
		cost: 300,
		other: null,
		return: null,
		real: 4500
	},
]