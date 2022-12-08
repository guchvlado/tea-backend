import TeaItemPage from '@components/screens/TeaItemPage';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react';
import { ITeaItem } from '../../types/ITeaItem';

interface TeaPageProps {
    item: ITeaItem;
}

const TeaPage = (props: TeaPageProps) => {

    return <TeaItemPage {...props} />
};

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get<ITeaItem[]>(`${process.env.NEXT_PUBLIC_API_HOST}/tea/all`)
    const data = response.data
    const paths = data.map(({ id }) => ({
        params: { id: id.toString() }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { id } = context.params!

    const response = await axios.get<ITeaItem>(`${process.env.NEXT_PUBLIC_API_HOST}/tea/` + id)
    const data = response.data

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            item: data
        }
    }
}

export default TeaPage;