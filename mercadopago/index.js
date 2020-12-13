// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
	integrator_id: 'dev_2e4ad5dd362f11eb809d0242ac130004',
	public_key: 'APP_USR-72b18fd4-a674-424c-9b9d-edd7f5f29814',
	access_token:
		'APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439'
});

const miSitioWeb = 'http://localhost:3000';
const referenciaExterna = 'eliseoabelcarh2@gmail.com';

const pagador = {
	name: 'Lalo Landa',
	email: 'test_user_46542185@testuser.com',
	phone: { area_code: '52', number: 5549737300 },
	identification: {
		type: 'DNI',
		number: '22334445'
	},
	address: {
		zip_code: '03940',
		street_name: 'Insurgentes Sur',
		street_number: 1602
	}
};
const metodosPagoExcluidos = [{ id: 'diners' }, { id: 'pagoefectivo_atm' }];
const maximoDeCuotas = 6;

// Crea un objeto de preferencia
let preference = {
	collector_id: 677408439,
	back_urls: {
		success: `${miSitioWeb}/success`,
		pending: `${miSitioWeb}/pending`,
		failure: `${miSitioWeb}/failure`
	},
	payer: pagador,
	payment_methods: {
		excluded_payment_methods: metodosPagoExcluidos,
		installments: maximoDeCuotas
	},
	auto_return: 'approved',
	external_reference: referenciaExterna,
	notification_url: 'https://hookb.in/QJmJgObaMwHkpp2WOlDD'
	//notification_url: `${miSitioWeb}/notifications`
};

const crearPreferencia = (producto) => {
	let imagenUrl = producto.img.split('').slice(1).join('');

	return {
		...preference,
		/* 	collector_id: 677408439,
		external_reference: referenciaExterna,
		payer: pagador,
		//notification_url: `${miSitioWeb}/notifications`,
		auto_return: 'approved',
		back_urls: {
			success: `${miSitioWeb}/success`,
			pending: `${miSitioWeb}/pending`,
			failure: `${miSitioWeb}/failure`
		},
		payment_methods: {
			excluded_payment_methods: metodosPagoExcluidos,
			installments: maximoDeCuotas
		}, */
		items: [
			{
				id: '1234',
				title: producto.title,
				description: producto.description,
				picture_url: `${miSitioWeb}${imagenUrl}`,
				unit_price: Number.parseFloat(producto.price),
				quantity: Number.parseInt(producto.unit)
			}
		]
	};
};

const mp = {
	create: async (req) => {
		const response = await mercadopago.preferences.create(
			crearPreferencia(req.query)
		);
		console.log('RESSSSPONSEE', response);
		req.query.init_point = response.body.sandbox_init_point;
		return { ...req.query };
	}
};

module.exports = mp;
