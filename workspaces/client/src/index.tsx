import $ from 'jquery';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { AdminApp } from '@wsh-2024/admin/src/index';
import { ClientApp } from '@wsh-2024/app/src/index';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  $(document).ready(() => {
    if (window.location.pathname.startsWith('/admin')) {
      ReactDOM.createRoot($('#root').get(0)!).render(<AdminApp />);
    } else {
      // ReactDOM.hydrateRoot(
      //   $('#root').get(0)!,
      //   <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
      //     <BrowserRouter>
      //       <ClientApp />
      //     </BrowserRouter>
      //   </SWRConfig>,
      // );
      ReactDOM.createRoot($('#root').get(0)!).render(
        <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <BrowserRouter>
            <ClientApp />
          </BrowserRouter>
        </SWRConfig>,
      );
    }
  });

  await registerServiceWorker();
};

main().catch(console.error);
