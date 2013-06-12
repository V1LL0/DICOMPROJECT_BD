from pyplasm import *
import scipy
from scipy import *
from pyplasm import *

# exercise 1

domain = INTERVALS(1)(40);
domain2 = PROD([INTERVALS(1)(40), INTERVALS(1)(1)]);
domain3= PROD([INTERVALS(1)(40),domain2]);


def genKnots2(controls):
	n = len(controls) + 3
	a = []
	a.append(0)
	a.append(0)
	a.append(0)
	i = 3
	while i <= (n-4):
		a.append(i-2)
		i = i +1 
	a.append(n-5)
	a.append(n-5)
	a.append(n-5)
	return a;


def DOMAIN2D(domains1D):
	def aux(q):
		a = q[0]
		b = q[1]
		c = q[2]
		d = q[3]
		return [ [ a, b, d ], [ d, b, c ] ]
	dd = PROD([ domains1D[0], domains1D[1] ])
	complex = UKPOL(dd)
	points = complex[0]
	cells = CAT(AA(aux)(complex[1]))
	return MKPOL([ points, cells, None ])

ld = INTERVALS(1)(40)
rd = INTERVALS(2 * PI)(32)

dd1 = DOMAIN2D([ ld, rd ])
dd2 = PROD([ ld, rd ])




#lato
puntiControllo = [[0,2.4,0],[2,0,0],[3.5,1,0],[5,2.2,0],[6.5,1,0],[7.5,0,0],[17,0,0],[18,1,0],[19.5,2,0],[21,1,0],[22,0.2,0],[24,0.6,0],[24.5,1.4,0],[25.1,2.3,0],[24.5,3,0],[24,3.5,0],[23.9,4.7,0],[22,4.8,0],[16.5,4.9,0],[8,5.3,0],[2.5,4.2,0],[2,3.6,0],[0.5,3,0],[0,2.4,0]]
d=genKnots2(puntiControllo)
curva = NUBSPLINE(2)(d)(puntiControllo)
curva_R=R([2,3])(PI/2)(curva)
curva_R_T=T([2,3])([6,-2.5])(curva_R)


#retro
puntiControllo_retro= [[6,5,0],[12,5,0],[12,2,0],[10.5,1,0],[1.5,1,0],[0,2,0],[0,5,0],[6,5,0]];

d3=genKnots2(puntiControllo_retro)
curva3 = NUBSPLINE(2)(d3)(puntiControllo_retro)
curva3_R=R([2,3])(PI/2)(curva3)
curva3_R2=R([1,2])(PI/2)(curva3_R)
curva3_R2_T=T([1,3])([12.5,-2.5])(curva3_R2)

#alto
puntiControllo_alto=  [[25,6,0],[24.9,1,0],[24.7,0.3,0],[12.5,0,0],[5,0.3,0],[0.5,2,0],[0,6,0],[0.5,10,0],[5,11.7,0],[12.5,12,0],[24.7,11.7,0],[24.9,11,0],[25,6,0]];

d4=genKnots2(puntiControllo_alto)
curva4 = NUBSPLINE(2)(d4)(puntiControllo_alto)



scheletro_Spider=STRUCT([curva_R_T,curva3_R2_T,curva4])
scheletro_Spider_scalato=S([1,2,3])([3,3,3])(scheletro_Spider);
scheletro_Spider_scalato_T=T([1,2,3])([-15,-1.5,6])(scheletro_Spider_scalato)
#corona ruota !


#esce un quasi cerchio
punti =  [[0.5,0.8,0],[0.2,0.8,0], [0.2,0.2,0], [0.8,0.2,0],[0.8,0.8,0],[0.5,0.8,0]];

b = BEZIER(S1)(punti);
out = MAP(b)(domain);
  


#prova cerchio interno piccolo
punti2 = [[0.5,0.8,1],[0.2,0.8,1], [0.2,0.2,1], [0.8,0.2,1],[0.8,0.8,1],[0.5,0.8,1]];
c= BEZIER(S1)(punti2);
out2 = MAP(c)(domain);


troncoCono = MAP(CUBICHERMITE(S2)([b,c,[10,0,0],[0,0,0]]))(domain3);
assiRuota=[R([1,3])(PI/12),troncoCono];
x=STRUCT(NN(24)(assiRuota));
corona_stellata= COLOR(GRAY)(STRUCT([troncoCono,x]));


#ruota
C=BEZIER(S1)
SPF=BEZIER(S2)




domain=GRID([6,6])
punti_rotazione = [ [ 4, 0, 5 ], [ 6, 0, 0.5 ], [ 7, 7, 7 ],[3.1,4.1,5.1]]
c1 = C(punti_rotazione)

s = ROTATIONALSURFACE(c1)
surf1 = MAP(s)(dd1)
surf2 = MAP(s)(dd2)



cerchione =COLOR(WHITE)(OFFSET([0.1,0.2,0.1])(ELLIPSE([1,1])(8)))
cerchione_R=R([2,3])(PI/2)(cerchione)
cerchione_RT=(T(2)(1.5)(cerchione_R))
cerchione_RT2=S([1,2,3])([-0.3,-0.3,-0.3])(cerchione_RT)
cerchione_RT2T=(T(2)(0.9)(cerchione_RT2))
gomma=COLOR(BLACK)(R([2,3])(PI/2)(S([1,2,3])([0.6,0.6,0.7])(surf1)))
gomma_T=T(2)(4)(gomma)

ruota_completa=STRUCT([cerchione_RT, cerchione_RT2T, gomma_T,corona_stellata]);



#altre ruote

ruota_completa2=T([1,2,3])([0,32,0])(ruota_completa)
ruota_completa3=T([1,2,3])([42.5,32,0])(ruota_completa)
ruota_completa4=T([1,2,3])([42.5,0,0])(ruota_completa)

ruote_finali=STRUCT([ruota_completa,ruota_completa2,ruota_completa3,ruota_completa4])

#VIEW(STRUCT([scheletro_Spider_scalato_T,ruote_finali]) );





#volante
manubrio=COLOR(BROWN)(R([2,3])(PI/2)(TORUS([5,7])([50,50])));


punti_volante1 =  [[0.5,0.8,-0.5],[0.2,0.8,-0.5], [0.2,0.2,-0.5], [0.8,0.2,-0.5],[0.8,0.8,-0.5],[0.5,0.8,-0.5]];

b = BEZIER(S1)(punti_volante1);
out = MAP(b)(domain);
  


#prova cerchio interno piccolo
punti_volante2 = [[0.5,0.8,0],[0.2,0.8,0], [0.2,0.2,0], [0.8,0.2,0],[0.8,0.8,0],[0.5,0.8,0]];
punti_volante3 = [[0.5,0.8,0.5],[0.2,0.8,0.5], [0.2,0.2,0.5], [0.8,0.2,0.5],[0.8,0.8,0.5],[0.5,0.8,0.5]];
c= BEZIER(S1)(punti_volante2);
out2 = MAP(c)(domain);


e= BEZIER(S1)(punti_volante3);
out3 = MAP(e)(domain);

assi_manubrio1 = MAP(CUBICHERMITE(S2)([b,c,[10,0,0],[0,0,0]]))(domain3);

assi_manubrio2 = MAP(CUBICHERMITE(S2)([c,e,[10,0,1],[0,0,0]]))(domain3);
assi_manubrio=STRUCT([assi_manubrio1,assi_manubrio2])

assi_manubrio_specchio=S([1])([-1])(assi_manubrio);
assi_manubrio_specchio_sotto=R([1,3])(3*PI/2)(assi_manubrio);

assi_manubrio_Totale=COLOR(BLACK)(T([1,2,3])([0,-1.7,0])(S([1,2,3])([2.6,2.6,2.6])(STRUCT([assi_manubrio,assi_manubrio_specchio,assi_manubrio_specchio_sotto]))))
#VIEW(assi_manubrio_Totale)


#centro volante

punti_rotazione_CV =  [[0.5,0,0],[0.4,0,0.3], [0.3,0,0.25], [0,0,0.1]];
curva_centro_volante = C(punti_rotazione_CV)

funz_rot_centro_volante = ROTATIONALSURFACE(curva_centro_volante)
meta_centro_volante = MAP(funz_rot_centro_volante)(dd1)
meta_centro_volante2=S([3])([-1])(meta_centro_volante)
centro_volante_Totale=COLOR(GRAY)(R([2,3])(PI/2)(S([1,2,3])([4.5,4.5,4.5])(STRUCT([meta_centro_volante,meta_centro_volante2]))))
Volante_sportivo=STRUCT([centro_volante_Totale,manubrio,assi_manubrio_Totale])

#ganci volante


punti_rotazione_gancio =  [[0.5,0,0],[0.4,0,0.3],[0,0,0.3]];
curva_gancio = C(punti_rotazione_gancio)

funz_rot_gancio = ROTATIONALSURFACE(curva_gancio)
meta_gancio = MAP(funz_rot_gancio)(dd1)
meta_gancio2=S([3])([-1])(meta_gancio)
gancio_Totale=COLOR(BLACK)(T([1,2,3])([-6,0,0])(S([1,2,3])([3,3,3])(STRUCT([meta_gancio,meta_gancio2]))))
gancio_Totale2=COLOR(BLACK)(T([1])(12)(gancio_Totale))
gancio_Totale3=R([1,3])(-PI/2)(gancio_Totale2)

Volante_sportivo=STRUCT([centro_volante_Totale,manubrio,assi_manubrio_Totale,gancio_Totale,gancio_Totale2,gancio_Totale3])
#VIEW(Volante_sportivo)
Volante_sportivo_S=S([1,2,3])([-0.5,-0.5,-0.5])(Volante_sportivo)
Volante_sportivo_ST=T([1,2,3])([14.5,17,6])(R([1,2])(3*PI/2)(Volante_sportivo_S));

Spider_ALFA_ROMEO=STRUCT([scheletro_Spider_scalato_T,ruote_finali,Volante_sportivo_ST]);


#VIEW(STRUCT([scheletro_Spider_scalato_T,ruote_finali,Volante_sportivo_ST]) );


#-------------------Tubo
pp1 = [ [ 0, 0, 0 ], [ 2, 0, 0 ], [ 2, 0, 0 ], [ 2, 5, 0 ] ];
pp2 = [ [ 0, -1, 0 ], [ 3, -1, 0 ], [ 3, -1, 0 ], [ 3, 5, 0 ] ];
c1 = C(pp1);
cc1 = MAP(c1)(domain2);
c2 = C(pp2);
cc2 = MAP(c2)(domain2);

s1 = CUBICHERMITE(S2)([ c1, c2, [ 0, 0, 2 ], [ 0, 0, -2 ] ]);
ss1 = MAP(s1)(domain3);
s2 = CUBICHERMITE(S2)([ c1, c2, [ 0, 0, -2 ], [ 0, 0, 2 ] ]);
ss2 = MAP(s2)(domain3);
tubo = STRUCT([ ss1, ss2 ]);



tubo_scappatura=T([1,2,3])([50,0,3])(R([1,2])(PI/2)(tubo))

Spider_ALFA_ROMEO=STRUCT([Spider_ALFA_ROMEO,tubo_scappatura])

#VIEW(ss);
#--------------------------superfici

cp1=[[0,1.5,2],[1,1,3],[2,0.5,0.5],[6,-0.5,0],[12,0.5,0.5],[13,1,3],[14,1.5,2]];
cp2=[[0,15,2.8],[1,16,3.5],[2,15.5,4],[6,15.5,4.1],[12,15.5,4],[13,16,3.5],[14,15,2.8]];


C_cp1=C(cp1);
C_cp2=C(cp2);

funz_cruscotto=CUBICHERMITE(S2)([ C_cp1,C_cp2, [ 0, 5, 5 ], [ 0, 5, 5 ] ]);

cruscotto=MAP(funz_cruscotto)(domain3);
cruscotto_S=T([1,2,3])([-20,32,6])(R([1,2])(-PI/2)(S([1,2,3])([2.3,2.3,2.3])(cruscotto)))
VIEW(cruscotto)


#cp2=[[0,16.5,2.5],[1,16,3.5],[2,15.5,1],[6,15,0.5],[12,15.5,1],[13,16,3.5],[14,16.5,2.5]];
## bagagliaio

cp3=[[0,0,0],[1,2,2],[2,2,1.8],[3,7.7,1.8],[7.5,8,1.7],[12,7.7,1.8],[13,2,1.8],[14,2,2],[14,0,0]];
cp4=[[0,14.5,-0.2],[1,15,1.8],[2,14,1.6],[3,14,1.6],[7.5,13.9,1.5],[12,14,1.6],[13,14,1.6],[14,15,1.8],[14,14.5,-0.2]];

C_cp3=C(cp3);
C_cp4=C(cp4);

funz_bagagliaio=CUBICHERMITE(S2)([ C_cp3,C_cp4, [ 0, 1, 1 ], [ 0, 1, 1 ] ]);

bagagliaio=MAP(funz_bagagliaio)(domain3);
bagagliaio_S=T([1,2,3])([27,32,6])(R([1,2])(-PI/2)(S([1,2,3])([2.3,2.3,2.3])(bagagliaio)))

VIEW(bagagliaio)

mock12=COLOR(RED)(STRUCT([cruscotto_S,bagagliaio_S]))
Spider_ALFA_ROMEO=STRUCT([Spider_ALFA_ROMEO,tubo,mock12])
VIEW(S([1,2,3])([2000,2000,2000])(Spider_ALFA_ROMEO))

#copriruoteS=S(3)(4)(copriruote);
# copriruoteF=MAP(BEZIER(S3)([S_cp123,S_cp4]))(domain3);

#copriruoteS=S(3)(4)(copriruote);
# copriruoteF=MAP(BEZIER(S3)([S_cp123,S_cp4]))(domain3);



# # punti per la scocca centrale
# C=BEZIER(S1)
# SPF=BEZIER(S2)
# #domain2 = DOMAIN([[0,1],[0,1]])([30,60]);
# domain = INTERVALS(1)(32);
# domain2 = PROD([INTERVALS(1)(24), INTERVALS(1)(1)]);
# domain3= PROD([INTERVALS(1)(24),domain2]);


# cp1=[[0,0,0],[0.8,0,0.1],[1,0,1],[0,0,2],[-1,0,1],[-0.8,0,0.1],[0,0,0]];
# cp2=[[0,1,-0.38],[1.3,1,-0.28],[1.5,1,1.5],[0,1,2.5],[-1.5,1,1.5],[-1.3,1,-0.28],[0,1,-0.38]];
# cp3=[[0,2,-0.38],[1.3,2,-0.28],[1.5,2,1.5],[0,2,2.5],[-1.5,2,1.5],[-1.3,2,-0.28],[0,2,-0.38]];
# cp4=[[0,3,0],[0.8,3,0.1],[1,3,1],[0,3,2],[-1,3,1],[-0.8,3,0.1],[0,3,0]];

# C_cp1=C(cp1);
# C_cp2=C(cp2);
# C_cp3=C(cp3);
# C_cp4=C(cp4);

# S_cp1234=SPF([C_cp1,C_cp2,C_cp3,C_cp4]);

# copriruote=MAP(S_cp1234)(domain2);
# #copriruoteS=S(3)(4)(copriruote);
# # copriruoteF=MAP(BEZIER(S3)([S_cp123,S_cp4]))(domain3);
# # copriruotaA=T([1,2,3])([-20,5,8])(copriruoteF);
# # copriruotaP=T(1)(110)(copriruotaA);
# moto=STRUCT([cerchione,copriruote]);


#corona

