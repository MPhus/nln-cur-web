import { ReactComponent as PVCombank } from '~/assets/bankIcons/bank-pvcb.svg'
import { ReactComponent as KienLongBank } from '~/assets/bankIcons/bank-klb.svg'
import { ReactComponent as ABBank } from '~/assets/bankIcons/bank-abb.svg'
import { ReactComponent as VietCredit } from '~/assets/bankIcons/bank-cfc.svg'
import { ReactComponent as KebHanaHN } from '~/assets/bankIcons/bank-kebhnhn.svg'
import { ReactComponent as Vietinbank } from '~/assets/bankIcons/bank-vtb.svg'
import { ReactComponent as KebHanaHCM } from '~/assets/bankIcons/bank-kebhnhcm.svg'
import { ReactComponent as BIDV } from '~/assets/bankIcons/bank-bidv.svg'
import { ReactComponent as Oceanbank } from '~/assets/bankIcons/bank-ojb.svg'
import { ReactComponent as HDBank } from '~/assets/bankIcons/bank-hdb.svg'
import { ReactComponent as TPBank } from '~/assets/bankIcons/bank-tpb.svg'
import { ReactComponent as VRB } from '~/assets/bankIcons/bank-vrb.svg'
import { ReactComponent as VPBank } from '~/assets/bankIcons/bank-vpb.svg'
import { ReactComponent as SHB } from '~/assets/bankIcons/bank-shb.svg'
import { ReactComponent as PublicBankVietNam } from '~/assets/bankIcons/bank-pbvn.svg'
import { ReactComponent as TMCPSàiGòn } from '~/assets/bankIcons/bank-sgcb.svg'
import { ReactComponent as MBBank } from '~/assets/bankIcons/bank-mb.svg'
import { ReactComponent as SeABank } from '~/assets/bankIcons/bank-seab.svg'
import { ReactComponent as Eximbank } from '~/assets/bankIcons/bank-eib.svg'
import { ReactComponent as BankSBI } from '~/assets/bankIcons/bank-sbis.svg'
import { ReactComponent as ACB } from '~/assets/bankIcons/bank-acb.svg'
import { ReactComponent as DongABank } from '~/assets/bankIcons/bank-dab.svg'
import { ReactComponent as NgânhàngBảnViệt } from '~/assets/bankIcons/bank-vccb.svg'
import { ReactComponent as BACABANK } from '~/assets/bankIcons/bank-nasb.svg'
import { ReactComponent as UOB } from '~/assets/bankIcons/bank-uob.svg'
import { ReactComponent as NCB } from '~/assets/bankIcons/bank-ncb.svg'
import { ReactComponent as VIB } from '~/assets/bankIcons/bank-vib.svg'
import { ReactComponent as NamABank } from '~/assets/bankIcons/bank-nab.svg'
import { ReactComponent as SAIGONBANK } from '~/assets/bankIcons/bank-sgb.svg'
import { ReactComponent as OCB } from '~/assets/bankIcons/bank-ocb.svg'
import { ReactComponent as BaoVietBank } from '~/assets/bankIcons/bank-bvb.svg'
import { ReactComponent as Techcombank } from '~/assets/bankIcons/bank-tcb.svg'
import { ReactComponent as MiraeAsset } from '~/assets/bankIcons/bank-mafc.svg'
import { ReactComponent as Sacombank } from '~/assets/bankIcons/bank-scb.svg'
import { ReactComponent as Vietcombank } from '~/assets/bankIcons/bank-vcb.svg'
import { ReactComponent as Indovina } from '~/assets/bankIcons/bank-ivb.svg'
import { ReactComponent as VietABank } from '~/assets/bankIcons/bank-vab.svg'
import { ReactComponent as Wooribank } from '~/assets/bankIcons/bank-woo.svg'
import { ReactComponent as ShinhanBank } from '~/assets/bankIcons/bank-shbvn.svg'
import { ReactComponent as GPBank } from '~/assets/bankIcons/bank-gpb.svg'
import { ReactComponent as LienVietPostBank } from '~/assets/bankIcons/bank-lpb.svg'

const banks = {
	PVCombank,
	KienLongBank,
	ABBank,
	VietCredit,
	KebHanaHN,
	Vietinbank,
	KebHanaHCM,
	BIDV,
	Oceanbank,
	HDBank,
	TPBank,
	VRB,
	VPBank,
	SHB,
	PublicBankVietNam,
	TMCPSàiGòn,
	MBBank,
	SeABank,
	Eximbank,
	BankSBI,
	ACB,
	DongABank,
	NgânhàngBảnViệt,
	BACABANK,
	UOB,
	NCB,
	VIB,
	NamABank,
	SAIGONBANK,
	OCB,
	BaoVietBank,
	Techcombank,
	MiraeAsset,
	Sacombank,
	Vietcombank,
	Indovina,
	VietABank,
	Wooribank,
	ShinhanBank,
	GPBank,
	LienVietPostBank
}

export default function MuitlpleBankSvgIcon(props) {
	const BankIcon = banks[props.bankNames]
	return BankIcon ? <BankIcon width={30} height={30} /> : <span></span>
}
