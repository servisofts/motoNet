import { SAssets } from 'servisofts-component';

import Logo, { ReactComponent as LogoW } from './svg/logo.svg';
import logoCompleto, { ReactComponent as logoCompletoW } from './svg/logoCompleto.svg';
import profile2, { ReactComponent as profile2W } from './svg/profile2.svg';
import mensajeria, { ReactComponent as mensajeriaW } from './svg/mensajeria.svg';
import pedidos, { ReactComponent as pedidosW } from './svg/pedidos.svg';
import transporte, { ReactComponent as transporteW } from './svg/transporte.svg';
import pointer, { ReactComponent as pointerW } from './svg/pointer.svg';
import addicon, { ReactComponent as addiconW } from './svg/addicon.svg';
import Icon1, { ReactComponent as Icon1W } from './svg/icon1.svg';
import Iayuda, { ReactComponent as IayudaW } from './svg/iayuda.svg';
import Iconf, { ReactComponent as IconfW } from './svg/iconf.svg';
import Idelivery, { ReactComponent as IdeliveryW } from './svg/idelivery.svg';
import Ihome, { ReactComponent as IhomeW } from './svg/ihome.svg';
import Imensajeria, { ReactComponent as ImensajeriaW } from './svg/imensajeria.svg';
import Itransporte, { ReactComponent as ItransporteW } from './svg/itransporte.svg';
import Isalir, { ReactComponent as IsalirW } from './svg/isalir.svg';
import Imoto, { ReactComponent as ImotoW } from './svg/moto.svg';
import Itorito, { ReactComponent as ItoritoW } from './svg/torito.svg';


const Assets: SAssets = {
    svg: {
        "Logo": { Native: Logo, Web: LogoW },
        "logoCompleto": { Native: logoCompleto, Web: logoCompletoW },
        "profile2": { Native: profile2, Web: profile2W },
        "mensajeria": { Native: mensajeria, Web: mensajeriaW },
        "pedidos": { Native: pedidos, Web: pedidosW },
        "transporte": { Native: transporte, Web: transporteW },
        "pointer": { Native: pointer, Web: pointerW },
        "addicon": { Native: addicon, Web: addiconW },
        "Icon1": { Native: Icon1, Web: Icon1W },
        "Iayuda": { Native: Iayuda, Web: IayudaW },
        "Iconf": { Native: Iconf, Web: IconfW },
        "Idelivery": { Native: Idelivery, Web: IdeliveryW },
        "Ihome": { Native: Ihome, Web: IhomeW },
        "Imensajeria": { Native: Imensajeria, Web: ImensajeriaW },
        "Itransporte": { Native: Itransporte, Web: ItransporteW },
        "Isalir": { Native: Isalir, Web: IsalirW },
        "Imoto": { Native: Imoto, Web: ImotoW },
        "Itorito": { Native: Itorito, Web: ItoritoW },
    }
}

export default Assets;