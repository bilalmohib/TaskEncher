import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';

/// Importing Firebase
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInAnonymously,
    GithubAuthProvider
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../firebase";
import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    Timestamp
} from "firebase/firestore";

import Head from 'next/head';
import Header from '@app/components/Landing/Header';
import Footer from '@app/components/Landing/Footer';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';

const ContactUs = () => {

    const addData = (data: any) => {
        ////////////////////////////// For New Version of Firebase(V9) //////////////////////////////
        // ADD JOB TO FIRESTORE
        addDoc(collection(db, `ContactUs`), data)
            .then(() => {
                console.log("Data sent");
                alert("Thank you for contacting us. We will get back to you soon.");
            })
            .catch(err => {
                console.warn(err);
                alert(`Error creating Job: ${err.message}`);
            });
        //
        ////////////////////////////// For New Version of Firebase(V9) //////////////////////////////
    }

    const formik = useFormik({
        initialValues: {
            "name": '',
            "email": '',
            "category": '',
            "message": '',
        },
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log(values);
            addData(values);
            setSubmitting(false);
            resetForm();
        },
        validate: (values) => {
            const errors: { [key: string]: string } = {};

            if (!values.name) {
                errors.name = 'Name is required';
            }

            if (!values.email) {
                errors.email = 'Email is required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.category) {
                errors.category = 'Category is required';
            }

            if (!values.message) {
                errors.message = 'Message is required';
            }

            return errors;
        },
    });

    const contactVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <>
            <Head>
                <title>Taskencher | Contact Us</title>
                <meta name="description" content="Taskencher Contact Us" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
            <Header />
            <Container sx={{ paddingTop: 8, paddingBottom: 8 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                        variants={contactVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.7321356009445!2d-97.82062608476414!3d30.186225981822973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b598a88be93d%3A0xb7483416d1f9ac91!2sTexas%20State%20Capitol!5e0!3m2!1sen!2sus!4v1647639372409!5m2!1sen!2sus"
                            width="100%"
                            height="450"
                            style={{
                                border: 0, borderRadius: '20px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
                            }}
                            allowFullScreen={true}
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </Box>
                <Box sx={{ textAlign: 'center' }} className="mt-8">
                    <motion.form
                        variants={contactVariants}
                        initial="hidden"
                        animate="visible"
                        onSubmit={formik.handleSubmit}
                        className="w-full md:w-8/12 mx-auto"
                    >
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}

                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        name="category"
                                        value={formik.values.category}
                                        label="Category"
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Technical Support">Technical Support</MenuItem>
                                        <MenuItem value="Sales">Sales</MenuItem>
                                        <MenuItem value="Partnerships">Partnerships</MenuItem>
                                    </Select>
                                    {formik.touched.category && formik.errors.category && <Box sx={{ color: 'red', fontSize: '0.8rem' }}>{formik.errors.category}</Box>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="message"
                                    name="message"
                                    label="Message"
                                    multiline
                                    rows={6}
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    error={formik.touched.message && Boolean(formik.errors.message)}
                                    helperText={formik.touched.message && formik.errors.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={formik.isSubmitting}
                                    sx={{ backgroundColor: '#3f51b5', color: '#fff', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600, fontSize: '1rem' }}
                                >
                                    {formik.isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                                </Button>
                            </Grid>
                        </Grid>
                    </motion.form>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ContactUs;