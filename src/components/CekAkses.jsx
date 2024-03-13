import React, { useEffect } from 'react'
import CekRole from './CekRole';
import { useRouter } from 'next/router';

function CekAkses() {
    const role = CekRole();
    const router = useRouter();
    
    useEffect(() => {
        const currentPage = window.location.pathname;

        if(role == 'merchant'){
            if(currentPage != '/admin/order' ){
                router.push("/admin/order");
            }
        }
      }, [role, router]);
}

export default CekAkses