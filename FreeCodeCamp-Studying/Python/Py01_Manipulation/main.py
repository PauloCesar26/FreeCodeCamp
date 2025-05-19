#acessar o numero de caracter que uma string tem com a função len()

#type() retorna o tipo da dado de uma variavel

#metodo find() é usado para encontrar a posição no alfabeto de cada letra da mensagem 
#alphabet.find(text[0])

#lower() deixa todas as letras minusculas
#find() retorna o indice de caracter dentro da string, se não for encontrado retorna -1
#index = alphabet.find(text[0].lower()) 
#print(index)

#shifted = alphabet[index + shift] #notação de colchetes para acessar o valor do alfabeto no indice index
#print(shifted)
text = "mrttaqrhknsw ih puggrur"
custom_key = "happycoding"

def vigenere(message, key, direction=1):
    #Esse algoritmo é chamado de cifra de Vigenère, onde o deslocamento de cada letra é determinado por outro texto, chamado de chave.
    key_index = 0 #chave é menor que o texto que vai ser criptografado, então vai ter que repetir ele até gerar todo o texto
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    final_message = ""

    for char in message.lower():
        #Acrescente qualquer caractere que não seja uma letra à mensagem
        #metodo isalpha() retorna true se todos os caracteres da string na qual ele é chamado forem letras 
        if not char.isalpha(): #operador not usado para negar a expressão, uqando colocado na frente de um valor verdadeiro, ele retorna false e vice-versa
            final_message += char
        else:
            # Encontre o caractere-chave certo para codificar/decodificar
            key_char = key[key_index % len(key)]
            key_index += 1
            # Defina o deslocamento e a letra criptografada/descriptografada
            offset = alphabet.index(key_char) #o metodo index() é a mesma coisa que find(), mas gera ValueError se não conseguir encontrar a substring
            index = alphabet.find(char)
            #operador modulo % é usado para retornar o resto da divisão entre dois numeros
            new_index = (index + offset * direction) % len(alphabet) #adicionar caracteres à sequencia do alfabeto, como digitos ou caracter especial
            final_message += alphabet[new_index]
            
    return final_message

def encrypt(message, key):
    return vigenere(message, key)

def decrypt(message, key):
    return vigenere(message, key, -1)

print(f"Encrypted text: {text}")
print(f"Key: {custom_key}")
decryption = decrypt(text, custom_key)
print(f"\nDecrypted text: {decryption}\n")









 