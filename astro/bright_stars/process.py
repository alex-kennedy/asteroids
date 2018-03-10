import json
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import random
import pandas as pd

SMALL = True

def process_catalog():
    bright_stars = []
    count = 1
    with open('astro/bright_stars/catalog.txt', 'r') as f:
        for line in f:
            star = {}

            line = line.ljust(197)

            star['hrn'] = line[0:4]
            star['name'] = line[4:14]
            star['dm'] = line[14:25]                # Durchmusterung Identification
            star['hd_cat_num'] = line[25:31]
            #star['sao_cat_num'] = line[31:37]
            #star['fk5_num'] = line[37:41]
            #star['ir_flag'] = line[41]
            #star['ir_ref'] = line[42]
            #star['double_multiple'] = line[43]
            #star['ads'] = line[44:49]
            #star['ads_comp'] = line[49:51]
            #star['var_id'] = line[51:60]
            #star['rah1900'] = line[60:62]
            #star['ram1900'] = line[62:64]
            #star['ras1900'] = line[64:68]
            #star['ras1900'] = line[64:68]
            #star['de_1900_sign'] = line[68]
            #star['ded1900'] = line[69:71]
            #star['dem1900'] = line[72:73]
            #star['des1900'] = line[73:75]
            star['rah'] = line[75:77]
            star['ram'] = line[77:79]
            star['ras'] = line[79:83]
            star['de_sign'] = line[83]
            star['ded'] = line[84:86]
            star['dem'] = line[86:88]
            star['des'] = line[88:90]
            #star['glon'] = line[90:96]
            #star['glat'] = line[96:102]
            star['vmag'] = line[102:107]
            #star['n_vmag'] = line[107]
            #star['u_vmag'] = line[108]
            #star['b_v'] = line[109:114]
            #star['u_b_v'] = line[114]
            #star['u_b'] = line[115:120]
            #star['u_u_b'] = line[120]
            #star['r_i'] = line[121:126]
            #star['n_r_i'] = line[126]
            #star['spectral_type'] = line[127:147]
            #star['n_spectral_type'] = line[147]
            #star['pmra'] = line[148:154]
            #star['pmde'] = line[154:160]
            #star['n_parallax'] = line[160]
            #star['parallax'] = line[161:166]
            #star['rad_vel'] = line[166:170]
            #star['n_rad_vel'] = line[170:174]
            #star['l_rad_vel'] = line[174:176]
            #star['rot_vel'] = line[176:179]
            #star['u_rot_vel'] = line[179]
            #star['dmag'] = line[180:184]
            #star['sep'] = line[184:190]
            #star['mult_id'] = line[190:194]
            #star['mult_id'] = line[194:196]
            #star['note_flag'] = line[196]

            for k, v in star.items():
                star[k] = v.strip()

                try:
                    if k in ['hrn', 'name', 'dm', 'hd_cat_num']:
                        star[k] = int(v)
                    else:
                        star[k] = float(v)
                except ValueError:
                    pass

            if star['rah'] != '':
                star['ra_rad'] = ((1./24)*star['rah'] + (1./1440)*star['ram'] + (1./86400)*star['ras']) * 2*np.pi
                star['dec_rad'] = ((1./360)*star['ded'] + (1./1440)*star['dem'] + (1./86400)*star['des']) * 2*np.pi

                if star['de_sign'] == '-':
                    star['dec_rad'] = -1 * star['dec_rad']

                star['x'] = 100 * np.cos(star['dec_rad']) * np.cos(star['ra_rad'])
                star['y'] = 100 * np.cos(star['dec_rad']) * np.sin(star['ra_rad'])
                star['z'] = 100 * np.sin(star['dec_rad'])

                star['intensity'] = (100 ** (1./5)) ** (7.96 - star['vmag'])
                star['intensity'] = np.log(star['intensity'])

                bright_stars.append(star)

    if SMALL:
        for star in bright_stars:
            for k in ['rah', 'ram', 'ras', 'hd_cat_num', 'hrn', 'de_sign', 'ded', 'dem', 'des', 'ra_rad', 'dec_rad', 'name', 'dm', 'vmag']:
                del star[k]

    stars_df = pd.DataFrame.from_dict(bright_stars)

    # Normalise intensity
    stars_df['intensity'] *= 10/stars_df['intensity'].max()

    stars_df.to_csv('astro/bright_stars/bright_stars.csv', index=False)

if __name__ == '__main__':
    process_catalog()