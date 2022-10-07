import { SAssets } from 'servisofts-component';

import Logo, { ReactComponent as LogoW } from './svg/logo.svg';
import logoCompleto, { ReactComponent as logoCompletoW } from './svg/logoCompleto.svg';
import profile2, { ReactComponent as profile2W } from './svg/profile2.svg';
import mensajeria, { ReactComponent as mensajeriaW } from './svg/mensajeria.svg';
import pedidos, { ReactComponent as pedidosW } from './svg/pedidos.svg';
import transporte, { ReactComponent as transporteW } from './svg/transporte.svg';
import pointer, { ReactComponent as pointerW } from './svg/pointer.svg';
import addicon, { ReactComponent as addiconW } from './svg/addicon.svg';


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
    }
}

export default Assets;