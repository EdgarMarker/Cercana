import type {StructureResolver} from 'sanity/structure'
import {DesktopIcon, HomeIcon } from '@sanity/icons'
import {FaRegBuilding, FaConciergeBell} from 'react-icons/fa'
import { BiMessageDetail } from "react-icons/bi";


export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem().icon(DesktopIcon).title('Home').child(
        S.documentTypeList('home') // Tipo de documento: pages
          .title('Home')
          .filter('_type == "home"'),
      ),
      S.listItem().icon(DesktopIcon).title('Alojamientos').child(
        S.documentTypeList('accommodations') // Tipo de documento: pages
          .title('Alojamientos')
          .filter('_type == "accommodations"'),
      ),
      S.listItem().icon(DesktopIcon).title('Desarrollos').child(
        S.documentTypeList('development') // Tipo de documento: pages
          .title('Desarrollos')
          .filter('_type == "development"'),
      ),
      S.listItem().icon(DesktopIcon).title('Nosotros').child(
        S.documentTypeList('us') // Tipo de documento: pages
          .title('Nosotros')
          .filter('_type == "us"'),
      ),
      S.listItem().icon(DesktopIcon).title('Contacto').child(
        S.documentTypeList('contact') // Tipo de documento: pages
          .title('Contacto')
          .filter('_type == "contact"'),
      ),

      S.divider(),

      S.listItem().icon(HomeIcon).title('Habitaciones').child(
        S.documentTypeList('rooms') // Tipo de documento: pages
          .title('Habitaciones')
          .filter('_type == "rooms"'),
      ),

      S.listItem().icon(HomeIcon).title('Categorías').child(
        S.documentTypeList('room-category') // Tipo de documento: pages
          .title('Categorías')
          .filter('_type == "room-category"'),
      ),

      S.listItem().icon(FaConciergeBell).title('Amenidades').child(
        S.documentTypeList('amenities') // Tipo de documento: pages
          .title('Amenidades')
          .filter('_type == "amenities"'),
      ),

      S.listItem().icon(BiMessageDetail).title('Testimonios').child(
        S.documentTypeList('testimonials') // Tipo de documento: pages
          .title('Testimonios')
          .filter('_type == "testimonials"'),
      ),

      S.divider(),

      S.listItem()
        .icon(FaRegBuilding)
        .title('Empresa')
        .child(S.document().title('Empresa').schemaType('company').documentId('company')),
    ])


