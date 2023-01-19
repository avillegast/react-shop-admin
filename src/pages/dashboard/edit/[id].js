import FormProduct from '@components/FormProduct';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import endPoints from '@services/api';
import axios from 'axios';
import useAlert from '@hooks/useAlert';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    const { id } = router.query;
    console.log('id');
    console.log(id);
    if (!router?.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [router?.isReady]);
  return <FormProduct setOpen={setOpen} setAlert={setAlert} product={product} />;
}
